import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

    const variants = {
        primary: "bg-gradient-to-r from-cyber-500 to-cyber-600 text-white hover:from-cyber-400 hover:to-cyber-500 shadow-lg hover:shadow-xl",
        secondary: "glass hover:bg-white/10 text-white border border-white/10",
        glow: "bg-gradient-to-r from-cyber-500 to-cyber-600 text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] shadow-[0_0_15px_rgba(14,165,233,0.3)]",
        outline: "border-2 border-cyber-500 text-cyber-500 hover:bg-cyber-500/10 hover:border-cyber-400 hover:text-cyber-400",
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
