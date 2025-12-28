import React from 'react';
import Modal from './ui/Modal';
import { motion } from 'framer-motion';
import { Calendar, Hash, Share2, Download, ExternalLink } from 'lucide-react';
import { formatCompactDate } from '../../utils/format';
import { EXPLORER_BASE_URL } from '../../constants/network';

const BadgeDetailModal = ({ badge, isOpen, onClose }) => {
    if (!badge) return null;

    const explorerLink = `${EXPLORER_BASE_URL}/txid/${badge.txId}?chain=mainnet`;

    const handleShare = () => {
        const text = `I just minted my Stacks POAP Badge #${badge.id}! 🚀\n\nCheck it out here:`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(badge.image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `stacks-poap-${badge.id}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error('Download failed:', e);
            // Fallback
            window.open(badge.image, '_blank');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={badge.name}>
            <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-1/2"
                >
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                        <img
                            src={badge.image}
                            alt={badge.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full md:w-1/2 space-y-6"
                >
                    <div>
                        <h4 className="text-sm font-bold text-cyber-400 uppercase tracking-wider mb-2">Description</h4>
                        <p className="text-slate-300 leading-relaxed">
                            {badge.description || "This is a unique Proof of Attendance Protocol badge minted on the Stacks blockchain."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                                <Hash size={12} /> Token ID
                            </div>
                            <p className="text-white font-mono font-bold">#{badge.id}</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                                <Calendar size={12} /> Minted
                            </div>
                            <p className="text-white font-mono font-bold">{formatCompactDate(Date.now())}</p> {/* Mock date for now */}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <a
                            href={explorerLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all text-sm"
                        >
                            <ExternalLink size={16} /> Explorer
                        </a>
                        <button
                            onClick={handleShare}
                            className="flex-1 flex items-center justify-center gap-2 bg-cyber-500/20 hover:bg-cyber-500/30 text-cyber-400 py-3 rounded-xl font-bold transition-all text-sm"
                        >
                            <Share2 size={16} /> Share
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white py-3 rounded-xl font-bold transition-all text-sm"
                        >
                            <Download size={16} /> Download
                        </button>
                    </div>
                </motion.div>
            </div>
        </Modal>
    );
};

export default BadgeDetailModal;
