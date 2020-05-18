import ulog from 'ulog';

// Formats aren't applied when doing logger.info()
// See https://github.com/Download/ulog#formatting
const myFormat = (logger, method, args): void => {
  // add the logger name to the call
  args.unshift(`[${logger.name}] `);
};

/**
 * Create a new
 *
 * @param name
 * @param options
 */
export const createLogger = (name: string, options?: object): any => {
  ulog.level = process.env.APP_STAGE === 'production' ? ulog.ERROR : ulog.DEBUG;
  ulog.formats.push(myFormat);

  return ulog(name);
};

export default createLogger;
