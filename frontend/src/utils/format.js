export const truncateAddress = (address, startLength = 4, endLength = 4) => {
    if (!address) return '';
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const formatSTX = (microStx) => {
    if (!microStx) return '0 STX';

    // micro-STX is 10^-6 STX
    const stx = parseInt(microStx) / 1000000;

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6
    }).format(stx) + ' STX';
};

export const formatCompactDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};
