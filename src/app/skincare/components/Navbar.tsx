'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, BookOpen, Bell, Sparkles, ShoppingBag, Crown, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { href: '/skincare', icon: Home, label: 'Início' },
    { href: '/skincare/rotinas', icon: Calendar, label: 'Rotinas' },
    { href: '/skincare/diario', icon: BookOpen, label: 'Diário' },
    { href: '/skincare/lembretes', icon: Bell, label: 'Lembretes' },
    { href: '/skincare/tratamentos', icon: Sparkles, label: 'Tratamentos' },
    { href: '/skincare/produtos', icon: ShoppingBag, label: 'Produtos' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-200 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/skincare" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              SkinCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/skincare/assinatura"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm">Premium</span>
            </Link>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold hover:scale-110 transition-transform"
              >
                {user?.user_metadata?.name?.[0]?.toUpperCase() || 'U'}
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden">
                  <div className="px-4 py-3 border-b border-pink-100">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.user_metadata?.name || 'Usuário'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-700 hover:bg-pink-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-pink-600'
                    : 'text-gray-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
