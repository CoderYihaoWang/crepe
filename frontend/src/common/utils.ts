export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
}

export function formatSize(size: number): string {
    if (size > 1000 * 1000 * 1000) {
        return `${Number((size / (1000 * 1000 * 1000)).toFixed(1))}GB`;
    }
    if (size > 1000 * 1000) {
        return `${Number((size / (1000 * 1000)).toFixed(1))}MB`;
    }
    if (size > 1000) {
        return `${Number((size / 1000).toFixed(1))}KB`;
    }
    return `${size}B`;
}