import React from 'react';
import { Award } from 'lucide-react';

const BadgeCard = ({ tokenId, timestamp }) => {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-500 to-cyber-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 rounded-3xl glass flex flex-col items-center text-center overflow-hidden">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyber-500/20 to-cyber-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award size={48} className="text-cyber-400" />
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Official POAP</p>
                    <h3 className="text-xl font-display font-black">Badge #{tokenId}</h3>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 w-full">
                    <p className="text-[10px] text-slate-500 uppercase font-black spacing-widest">Mainnet Verified</p>
                </div>

                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                    <div className="w-12 h-12 border-2 border-dashed border-white rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default BadgeCard;
