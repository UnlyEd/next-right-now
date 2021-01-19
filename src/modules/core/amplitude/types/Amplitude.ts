import {
  Callback,
  LogReturn,
} from 'amplitude-js';

export type LogEvent = (event: string, data?: any, callback?: Callback) => LogReturn;
