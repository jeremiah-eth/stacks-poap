import React from 'react';
import { useTransactions } from '../../context/TransactionContext';
import { getExplorerTxLink } from '../../utils/links';
import { formatCompactDate } from '../../utils/format';
import { ExternalLink, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecentTransactions = () => {
    const { transactions } = useTransactions();

    if (transactions.length === 0) return null;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return <CheckCircle size={14} className="text-green-400" />;
            case 'failed': return <XCircle size={14} className="text-red-400" />;
            default: return <Loader2 size={14} className="text-cyber-400 animate-spin" />;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-20">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Clock size={20} className="text-cyber-400" />
                Recent Activity
            </h3>

            <div className="grid gap-3">
                <AnimatePresence>
                    {transactions.slice(0, 5).map((tx) => (
                        <motion.div
                            key={tx.txId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="glass p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg bg-white/5 ${tx.status === 'pending' ? 'animate-pulse' : ''}`}>
                                    {getStatusIcon(tx.status)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-slate-200">
                                        {tx.type === 'mint' ? 'Mint Badge' : 'Transaction'}
                                    </p>
                                    <p className="text-xs text-slate-500 font-mono">
                                        {formatCompactDate(tx.timestamp)}
                                    </p>
                                </div>
                            </div>

                            <a
                                href={getExplorerTxLink(tx.txId)}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                title="View on Explorer"
                            >
                                <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RecentTransactions;
