import React from 'react';
import BadgeCard from './Card';
import { useCollection } from '../hooks/useCollection';
import { useStacks } from '../context/StacksContext';
import Button from './Button';
import { motion } from 'framer-motion';

const CollectionGrid = () => {
    const { isConnected, connectWallet } = useStacks();
    const { badges, isLoading } = useCollection();

    if (!isConnected) {
        return (
            <div className="py-20 text-center glass rounded-3xl border-dashed border-2 border-white/5">
                <h3 className="text-2xl font-display font-bold mb-4">Connect to see your collection</h3>
                <Button variant="secondary" onClick={connectWallet}>Connect Wallet</Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 rounded-3xl glass animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (badges.length === 0) {
        return (
            <div className="py-20 text-center glass rounded-3xl border-dashed border-2 border-white/5">
                <p className="text-slate-500 font-bold uppercase tracking-widest">You don't have any badges yet</p>
            </div>
        );
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
        >
            <div className="min-h-[50vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {badges.map((badge, index) => (
                            <motion.div
                                key={badge.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-square rounded-2xl overflow-hidden glass hover:shadow-2xl hover:shadow-cyber-500/20 transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <img
                                    src={badge.image}
                                    alt={badge.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-cyber-400 text-xs font-bold uppercase tracking-wider mb-1">Badge #{badge.id}</span>
                                    <h3 className="text-white font-bold text-lg leading-tight">{badge.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {badges.length === 0 && !isLoading && (
                    <div className="text-center py-20">
                        <p className="text-slate-400">No badges found in this wallet.</p>
                        <button onClick={handleMint} className="mt-4 text-cyber-400 hover:text-cyber-300 font-bold">
                            Mint your first badge →
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};


export default CollectionGrid;
