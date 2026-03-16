'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DrawerLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: '/', icon: '🗺️', label: 'Find Route' },
  { href: '/routes', icon: '📋', label: 'All Routes' },
];

export default function DrawerLayout({ children }: DrawerLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="drawer">
      <input id="jeepme-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content area */}
      <div className="drawer-content relative">
        {/* Hamburger button */}
        <label
          htmlFor="jeepme-drawer"
          className="btn btn-ghost btn-circle fixed left-3 top-3 z-[1050] shadow-lg"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        {children}
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-[1200]">
        <label
          htmlFor="jeepme-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <aside
          className="min-h-full w-72 p-0"
          style={{
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Sidebar header */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-lg shadow-lg">
                🚐
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-tight">
                  JeepMe
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-widest text-amber-400/70">
                  Cebu Transit
                </p>
              </div>
            </div>
          </div>

          {/* Navigation items */}
          <nav className="p-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <label htmlFor="jeepme-drawer" className="block">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        pathname === item.href
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  </label>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-5">
            <p className="text-[10px] text-center text-white/30 leading-relaxed">
              Made with 💛 for Cebuano commuters
              <br />
              Route data is approximate
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
