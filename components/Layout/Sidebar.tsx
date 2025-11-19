'use client';

import React from 'react';
import { LayoutDashboard, Search, BarChart3, Settings, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col flex-shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">AEO Command</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                    Intelligence
                </div>
                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/" active={pathname === '/'} />
                <NavItem icon={<Search size={20} />} label="Keyword Monitor" href="/keyword-monitor" active={pathname === '/keyword-monitor'} />
                <NavItem icon={<BarChart3 size={20} />} label="Competitor Analysis" href="/competitor-analysis" active={pathname === '/competitor-analysis'} />

                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-4 px-2">
                    Configuration
                </div>
                <NavItem icon={<Shield size={20} />} label="Brand Safety" />
                <NavItem icon={<Settings size={20} />} label="Settings" />
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">System Status</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-green-400">Online & Monitoring</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ icon, label, active = false, href = '#' }: { icon: React.ReactNode; label: string; active?: boolean; href?: string }) => {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${active
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                : 'hover:bg-slate-800 hover:text-white'
                }`}
        >
            <span className={active ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}>
                {icon}
            </span>
            <span className="font-medium">{label}</span>
        </Link>
    );
};

export default Sidebar;
