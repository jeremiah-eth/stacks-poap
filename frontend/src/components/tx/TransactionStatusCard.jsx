import React, { useEffect, useState } from 'react';
import { useTransactionStatus } from '../../hooks/useTransactionStatus';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, ExternalLink, X } from 'lucide-react';
import { EXPLORER_BASE_URL } from '../../constants/network';
import { truncateAddress } from '../../utils/format';

const TransactionStatusCard = ({ txId, onClose }) => {
    const { status, data } = useTransactionStatus(txId);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (status === 'success' || status === 'failed') {
            // Auto hide after 10 seconds for finished states
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [status, onClose]);

    if (!isVisible) return null;

    const getStatusConfig = () => {
        switch (status) {
            case 'success':
                return {
                    icon: <CheckCircle className="text-green-400" size={20} />,
                    title: 'Transaction Confirmed',
                    desc: 'Your badge has been minted!',
                    color: 'border-green-500/20 bg-green-500/10'
                };
            case 'failed':
                return {
                    icon: <XCircle className="text-red-400" size={20} />,
                    title: 'Transaction Failed',
                    desc: 'Please try again.',
                    color: 'border-red-500/20 bg-red-500/10'
                };
            default:
                return {
                    icon: <Loader2 className="text-cyber-400 animate-spin" size={20} />,
                    title: 'Confirming Transaction...',
                    desc: 'This usually takes 1-3 minutes on Stacks.',
                    color: 'border-cyber-500/20 bg-cyber-950/80'
                };
        }
    };

    const config = getStatusConfig();
    const explorerLink = `${EXPLORER_BASE_URL}/txid/${txId}?chain=mainnet`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-6 right-6 w-80 rounded-2xl p-4 backdrop-blur-xl border shadow-2xl z-50 ${config.color}`}
        >
            <div className="flex items-start gap-3">
                <div className="mt-1">
                    {config.icon}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">{config.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{config.desc}</p>
                    <a
                        href={explorerLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-cyber-400 mt-2 transition-colors"
                    >
                        {truncateAddress(txId, 6, 6)}
                        <ExternalLink size={10} />
                    </a>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-slate-500 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {status === 'pending' && (
                <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-cyber-500"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default TransactionStatusCard;
