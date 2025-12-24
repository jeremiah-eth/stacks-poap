import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-cyber-500 to-cyber-400 text-cyber-950 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
        secondary: "glass hover:bg-white/10 text-white",
        outline: "border border-cyber-500/30 text-cyber-400 hover:bg-cyber-500/10",
        ghost: "text-slate-400 hover:text-white hover:bg-white/5"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
