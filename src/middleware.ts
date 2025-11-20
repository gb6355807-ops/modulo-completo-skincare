import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Rotas protegidas que precisam de autenticação
  const protectedRoutes = ['/skincare']
  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // Se está tentando acessar rota protegida sem estar logado
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Se está logado e tentando acessar login/signup, redireciona para dashboard
  if (user && (req.nextUrl.pathname.startsWith('/auth/login') || req.nextUrl.pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/skincare', req.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/skincare/:path*', '/auth/:path*'],
}