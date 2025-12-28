import React, { useState } from 'react';
import { useStacks } from '../context/StacksContext';
import { useSTXBalance } from '../hooks/useSTXBalance';
import { truncateAddress, formatSTX } from '../utils/format';
import { User, ChevronDown, LogOut, Copy, RefreshCw, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';

const UserMenu = () => {
    const { address, disconnectWallet } = useStacks();
    const { name } = useBNS();
    const { stx, loading: balanceLoading, refresh: refreshBalance } = useSTXBalance();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        toast.success('Address copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const displayName = name || truncateAddress(address);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-all border border-white/10 group"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-500 to-cyber-600 flex items-center justify-center text-white shadow-lg">
                    <User size={14} />
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                        {displayName}
                    </span>
                </div>
                <ChevronDown
                    size={14}
                    className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl glass-premium border border-white/10 p-2 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="px-4 py-3 border-b border-white/5 mb-2">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Signed in as</p>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-white font-mono break-all">{name || address}</p>
                                <button
                                    onClick={copyAddress}
                                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                    title="Copy Address"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-xs bg-black/20 rounded-lg p-2">
                                <span className="text-slate-400">Balance:</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-cyber-400 font-mono font-bold">{formatSTX(stx)}</span>
                                    <button onClick={refreshBalance} className={`text-slate-500 hover:text-white transition-colors ${balanceLoading ? 'animate-spin' : ''}`}>
                                        <RefreshCw size={10} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={disconnectWallet}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-sm font-bold mt-1"
                        >
                            <LogOut size={16} />
                            Disconnect
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
