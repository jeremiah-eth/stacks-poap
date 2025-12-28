import React, { useState } from 'react';
import Button from './Button';
import UserMenu from './UserMenu';
import { useStacks } from '../context/StacksContext';
import { LogOut, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { isConnected, address, connectWallet, disconnectWallet } = useStacks();
    const [showMenu, setShowMenu] = useState(false);

    const truncateAddress = (addr) => {
        if (!addr) return '';
        return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
    };

    return (
        <nav className="h-20 border-b border-white/5 flex items-center px-6 glass sticky top-0 z-50">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-500 to-cyber-400 flex items-center justify-center font-black text-cyber-950 text-xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        P
                    </div>
                    <span className="text-2xl font-display tracking-tight font-black uppercase">
                        Stacks<span className="text-cyber-400">POAP</span>
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
                        <a href="#" className="hover:text-cyber-400 transition-colors">How it works</a>
                        <a href="#" className="hover:text-cyber-400 transition-colors">Explorer</a>
                    </div>

                    {isConnected ? (
                        <UserMenu />
                    ) : (
                        <Button variant="glow" className="px-5 py-2.5 text-sm" onClick={connectWallet}>
                            Connect Wallet
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

