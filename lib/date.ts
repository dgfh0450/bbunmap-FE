export const getCurrentTime = () => {
    const now = new Date();
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return kstNow.toISOString();
}