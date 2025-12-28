// Framer Motion animation presets for consistent animations across the app

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
};

export const slideInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

export const slideInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
};

// Stagger container for list animations
export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Default transition settings
export const defaultTransition = {
    duration: 0.3,
    ease: "easeInOut"
};

export const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
};
