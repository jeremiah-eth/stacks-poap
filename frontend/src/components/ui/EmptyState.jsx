import React from 'react';
import { motion } from 'framer-motion';
import { Ghost } from 'lucide-react';

const EmptyState = ({ onAction, actionLabel = "Get Started" }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyber-500/20 to-purple-500/20 animate-spin-slow" />
                <Ghost size={40} className="text-slate-500 relative z-10" />
            </motion.div>

            <h3 className="text-2xl font-display font-bold text-white mb-2">No badges yet</h3>
            <p className="text-slate-400 max-w-xs mx-auto mb-8">
                Your collection is empty. Mint your first POAP badge to start building your legacy on Stacks.
            </p>

            <button
                onClick={onAction}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyber-500 to-cyber-600 text-white font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-1"
            >
                {actionLabel}
            </button>
        </div>
    );
};

export default EmptyState;
