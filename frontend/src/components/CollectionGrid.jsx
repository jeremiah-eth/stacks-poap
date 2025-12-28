import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';
import { useStacks } from '../context/StacksContext';
import { useMint } from '../hooks/useMint';
import EmptyState from './ui/EmptyState';
import toast from 'react-hot-toast';

const CollectionGrid = () => {
    const { isConnected, connectWallet } = useStacks();
    const { badges, isLoading } = useCollection();
    const { mint } = useMint();

    const handleMint = async () => {
        if (!isConnected) {
            connectWallet();
            return;
        }
        // Small check to ensure user knows
        toast.promise(mint(), {
            loading: 'Preparing to mint...',
            success: 'Minting process started!',
            error: 'Minting cancelled or failed',
        });
    };

    if (!isConnected) {
        return (
            <div className="py-20 text-center glass rounded-3xl border-dashed border-2 border-white/5">
                <h3 className="text-2xl font-display font-bold mb-4">Connect to see your collection</h3>
                <button onClick={connectWallet} className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-bold">
                    Connect Wallet
                </button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[50vh]"
        >
            {badges.length > 0 ? (
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
            ) : (
                <EmptyState onAction={handleMint} actionLabel="Mint First Badge" />
            )}
        </motion.div>
    );
};

export default CollectionGrid;
