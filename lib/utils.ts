export const ensureAbsoluteUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('mailto:') || url.startsWith('tel:')) return url;
    if (url.includes('@') && !url.includes('://')) return `mailto:${url}`;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
};

export const formatSocialHref = (name: string, href: string, baseUrls: Record<string, string>) => {
    if (!href) return '';
    if (href.startsWith('http')) return href;

    const baseUrl = baseUrls[name];
    if (baseUrl) {
        const cleanValue = href.startsWith('@') ? href.substring(1) : href;
        return `${baseUrl}${cleanValue}`;
    }

    return `https://${href}`;
};
