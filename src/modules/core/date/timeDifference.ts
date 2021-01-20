/**
 * Displays the difference (as en English sentence) between two Date objects
 *
 * @param current
 * @param previous
 *
 * @see https://stackoverflow.com/a/6109105/2391795
 */
const timeDifference = (current: Date, previous: Date): string => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  // @ts-ignore Don't know if there is a proper way to do that, shouldn't it be allowed?
  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.floor(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.floor(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.floor(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.floor(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return 'approximately ' + Math.floor(elapsed / msPerMonth) + ' months ago';
  } else {
    return 'approximately ' + Math.floor(elapsed / msPerYear) + ' years ago';
  }
};

export default timeDifference;
