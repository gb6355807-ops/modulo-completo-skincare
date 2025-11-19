import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas protegidas que precisam de autenticação
  const protectedRoutes = ['/skincare']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Se está tentando acessar rota protegida sem estar logado
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Se está logado e tentando acessar login/signup, redireciona para dashboard
  if (session && (req.nextUrl.pathname.startsWith('/auth/login') || req.nextUrl.pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/skincare', req.url))
  }

  return res
}

export const config = {
  matcher: ['/skincare/:path*', '/auth/:path*'],
}
