import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 flex-shrink-0 z-10">
            <div className="flex items-center gap-4 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 w-96">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search for a keyword or competitor..."
                    className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder:text-slate-500"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-800"></div>

                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 p-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        BS
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-white">Boligsiden Admin</p>
                        <p className="text-xs text-slate-400">Pro Plan</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>
            </div>
        </header>
    );
};

export default Header;
