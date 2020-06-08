/**
 * Returns the elapsed time between two timestamps, in seconds
 *
 * @param oldTimestamp
 * @param newTimestamp
 */
const getTimestampsElapsedTime = (oldTimestamp: number, newTimestamp: number): number => (newTimestamp - oldTimestamp) / 1000;

export default getTimestampsElapsedTime;
