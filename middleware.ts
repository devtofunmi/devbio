import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Paths that need a session check. Everything else skips Supabase entirely. */
const AUTH_PATHS = ['/dashboard', '/claim', '/login', '/signup']

const SITE_HOST = (process.env.NEXT_PUBLIC_SITE_URL || 'https://devbio.co')
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .toLowerCase()

/**
 * Hosts that serve the whole app. Anything else is treated as a user's own
 * domain and only ever gets their profile.
 */
function isPrimaryHost(host: string) {
    return (
        host === SITE_HOST ||
        host === `www.${SITE_HOST}` ||
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host.endsWith('.vercel.app')
    )
}

export async function middleware(req: NextRequest) {
    const host = (req.headers.get('host') || '').split(':')[0].toLowerCase()

    // Before anything else, and with no Supabase call: this runs on every
    // public profile view, so an auth round-trip here would be paid on all of them.
    if (host && !isPrimaryHost(host)) {
        const { pathname, search } = req.nextUrl

        // A custom domain serves one thing: the owner's profile. Send anything
        // else back to the app, which is where the session lives anyway.
        if (pathname !== '/') {
            return NextResponse.redirect(
                new URL(`${pathname}${search}`, `https://${SITE_HOST}`)
            )
        }

        const url = req.nextUrl.clone()
        url.pathname = `/site/${host}`
        return NextResponse.rewrite(url)
    }

    // Only the auth paths pay for a session lookup.
    if (!AUTH_PATHS.some((p) => req.nextUrl.pathname.startsWith(p))) {
        return NextResponse.next()
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Allow if "code" search param is present, to let Supabase client handle the OAuth exchange on the dashboard page
    if (req.nextUrl.pathname.startsWith('/dashboard') && !req.nextUrl.searchParams.has('code')) {
        if (!session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/login'
            // Preserve the original path and ALL existing search params (like ?welcome=true)
            redirectUrl.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search)
            return NextResponse.redirect(redirectUrl)
        }
    }

    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        if (session) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', session.user.id)
                .single()

            const redirectUrl = req.nextUrl.clone()

            if (!profile?.username) {
                redirectUrl.pathname = '/claim'
            } else {
                redirectUrl.pathname = '/dashboard'
                // Preserve query params when force-redirecting to dashboard
                req.nextUrl.searchParams.forEach((value, key) => {
                    redirectUrl.searchParams.set(key, value)
                })
            }

            return NextResponse.redirect(redirectUrl)
        }
    }

    return res
}

export const config = {
    // Widened from the four auth paths so custom-domain requests to "/" are
    // seen at all. Assets and API routes are excluded.
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
