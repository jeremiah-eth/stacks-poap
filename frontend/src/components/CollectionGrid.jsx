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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {badges.map((badge) => (
                <motion.div key={badge.value.repr} variants={item}>
                    <BadgeCard
                        tokenId={badge.value.repr.replace('u', '')}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};


export default CollectionGrid;
