/**
 * Thin wrapper over Vercel's project-domains API.
 *
 * Server only: VERCEL_TOKEN grants full control of the project, so this must
 * never be imported into client code.
 *
 * Required env:
 *   VERCEL_TOKEN       personal or team access token
 *   VERCEL_PROJECT_ID  the project domains are attached to
 *   VERCEL_TEAM_ID     optional, only when the project lives under a team.
 *                      Verified unnecessary here: the project resolves without
 *                      it on the devtofunmis-projects scope.
 *   VERCEL_DOMAIN_LIMIT  optional, domains Vercel allows on the project.
 *                      Defaults to the Hobby ceiling of 50; raise it after
 *                      upgrading to Pro, where the limit is effectively gone.
 */

const API = "https://api.vercel.com";

const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const TEAM_ID = process.env.VERCEL_TEAM_ID;

export const vercelConfigured = Boolean(TOKEN && PROJECT_ID);

const withTeam = (path: string) =>
    TEAM_ID
        ? `${path}${path.includes("?") ? "&" : "?"}teamId=${encodeURIComponent(TEAM_ID)}`
        : path;

export type DnsRecord = { type: string; name: string; value: string };

export type DomainStatus = {
    domain: string;
    /** Vercel has confirmed ownership (TXT challenge, when one was required). */
    verified: boolean;
    /** DNS actually resolves to Vercel, so the domain serves traffic. */
    configured: boolean;
    /** Records the owner still needs to add, ready to display. */
    records: DnsRecord[];
    /** Vercel's own explanation when something is wrong, for the UI to surface. */
    reason: string | null;
};

class VercelError extends Error {
    status: number;
    code: string;
    constructor(message: string, status: number, code: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
    if (!vercelConfigured) {
        throw new VercelError("Vercel integration is not configured", 503, "not_configured");
    }

    const res = await fetch(`${API}${withTeam(path)}`, {
        ...init,
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : {};

    if (!res.ok) {
        const err = body?.error || {};
        throw new VercelError(
            err.message || `Vercel request failed (${res.status})`,
            res.status,
            err.code || "unknown"
        );
    }
    return body as T;
}

type AddDomainResponse = {
    name: string;
    verified: boolean;
    verification?: { type: string; domain: string; value: string; reason: string }[];
};

type DomainConfigResponse = {
    /** Vercel returns misconfigured: true when DNS does not point at them. */
    misconfigured: boolean;
    /** Present for apex domains that need an A record. */
    aValues?: string[];
    /** Project-specific CNAME target. Not the old shared cname.vercel-dns.com. */
    cnames?: string[];
    recommendedCNAME?: { rank: number; value: string }[];
    recommendedIPv4?: { rank: number; value: string[] }[];
};

type ProjectDomainResponse = {
    name: string;
    verified: boolean;
    verification?: { type: string; domain: string; value: string; reason: string }[];
};

/** Two labels normally, three for two-part TLDs like co.uk. */
const apexLabelCount = (parts: string[]) =>
    parts.length >= 3 && /^(co|com|org|net|ac|gov)$/.test(parts[parts.length - 2]) ? 3 : 2;

export const isApex = (domain: string) => {
    const parts = domain.split(".");
    return parts.length <= apexLabelCount(parts);
};

/**
 * Builds the records to show the owner from Vercel's own response, so the
 * project-specific CNAME target and current apex IPs are always correct rather
 * than hardcoded.
 */
function recordsFor(
    domain: string,
    config: DomainConfigResponse,
    pending: ProjectDomainResponse["verification"]
): { records: DnsRecord[]; routable: boolean } {
    const records: DnsRecord[] = [];

    // Ownership challenge, only present when the domain sits on another account.
    for (const v of pending || []) {
        if (v.type?.toUpperCase() === "TXT") {
            records.push({ type: "TXT", name: v.domain, value: v.value });
        }
    }

    const parts = domain.split(".");
    let routable = true;

    if (isApex(domain)) {
        const ip = config.aValues?.[0] || config.recommendedIPv4?.[0]?.value?.[0];
        // No guessed default on purpose. Vercel's apex IP has changed before
        // (it is 216.198.79.1 today, not the 76.76.21.21 that is widely
        // copy-pasted), and handing someone a stale address points their domain
        // at nothing while looking perfectly correct.
        if (ip) records.push({ type: "A", name: "@", value: ip });
        else routable = false;
    } else {
        // Project-specific, e.g. d1d4fc829fe7bc7c.vercel-dns-017.com.
        const target = config.cnames?.[0] || config.recommendedCNAME?.[0]?.value;
        const name = parts.slice(0, parts.length - apexLabelCount(parts)).join(".") || "@";
        if (target) records.push({ type: "CNAME", name, value: target });
        else routable = false;
    }

    return { records, routable };
}

/**
 * Hobby allows 50 domains per project and Vercel rejects the 51st with a raw
 * API error. Reading the current list lets us fail with something a user can
 * understand, and tells us whether a domain is already attached so re-adding
 * one does not count against the ceiling.
 */
// parseInt rather than Number: a trailing inline comment in .env would make
// Number() return NaN, and `count >= NaN` is always false, silently disabling
// the guard. Anything unparseable or non-positive falls back to the Hobby cap.
const parsedLimit = Number.parseInt(String(process.env.VERCEL_DOMAIN_LIMIT ?? ""), 10);
export const DOMAIN_LIMIT =
    Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 50;

export type ProjectDomains = {
    names: string[];
    /** More than one page exists, so `names` is not the full picture. */
    truncated: boolean;
};

export async function listProjectDomains(): Promise<ProjectDomains> {
    const data = await call<{
        domains?: { name: string }[];
        pagination?: { next: number | null };
    }>(`/v9/projects/${PROJECT_ID}/domains?limit=100`);

    return {
        names: (data.domains || []).map((d) => d.name.toLowerCase()),
        truncated: Boolean(data.pagination?.next),
    };
}

/** Attach a domain to the project. Safe to call for one already attached. */
export async function addDomain(domain: string): Promise<AddDomainResponse> {
    return call<AddDomainResponse>(`/v10/projects/${PROJECT_ID}/domains`, {
        method: "POST",
        body: JSON.stringify({ name: domain }),
    });
}

export async function removeDomain(domain: string): Promise<void> {
    try {
        await call(`/v9/projects/${PROJECT_ID}/domains/${encodeURIComponent(domain)}`, {
            method: "DELETE",
        });
    } catch (err) {
        // Already gone is a success for our purposes.
        if (err instanceof VercelError && err.status === 404) return;
        throw err;
    }
}

/** Current state plus the records still needed, in one call pair. */
export async function getDomainStatus(domain: string): Promise<DomainStatus> {
    const [projectDomain, config] = await Promise.all([
        call<ProjectDomainResponse>(
            `/v9/projects/${PROJECT_ID}/domains/${encodeURIComponent(domain)}`
        ),
        call<DomainConfigResponse>(`/v6/domains/${encodeURIComponent(domain)}/config`),
    ]);

    const verified = Boolean(projectDomain.verified);
    const configured = !config.misconfigured;

    const { records, routable } = recordsFor(domain, config, projectDomain.verification);

    let reason: string | null = null;
    if (!routable) {
        reason = "Couldn't read the DNS target from Vercel. Try checking again shortly.";
    } else if (!verified) {
        reason =
            projectDomain.verification?.[0]?.reason ||
            "Waiting on the ownership record to appear.";
    } else if (!configured) {
        reason = "DNS is not pointing at Vercel yet.";
    }

    return { domain, verified, configured, records, reason };
}

export { VercelError };
