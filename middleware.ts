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
    // Checks if the user is trying to access the dashboard
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (!session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/login'
            redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
            return NextResponse.redirect(redirectUrl)
        }
    }

    // Redirect signed-in users away from login/signup pages
    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        if (session) {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/dashboard'
            return NextResponse.redirect(redirectUrl)
        }
    }

    return res
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
}