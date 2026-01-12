import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (!session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/login'
            // Preserve the original path and ALL existing search params (like ?welcome=true)
            redirectUrl.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search)
            return NextResponse.redirect(redirectUrl)
        }
    }

    // Redirect signed-in users away from login/signup pages
    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        if (session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/dashboard'
            // Preserve query params when force-redirecting to dashboard
            req.nextUrl.searchParams.forEach((value, key) => {
                redirectUrl.searchParams.set(key, value)
            })
            return NextResponse.redirect(redirectUrl)
        }
    }

    return res
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
}