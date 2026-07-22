const formatLog = (level: string, message: unknown, meta?: unknown[]): string => {
  const timestamp = new Date().toISOString();
  const formattedMessage = typeof message === 'string' ? message : JSON.stringify(message);
  const formattedMeta = meta && meta.length > 0 ? ' ' + meta.map((m) => (typeof m === 'string' ? m : JSON.stringify(m))).join(' ') : '';
  return `[${timestamp}] ${level} ${formattedMessage}${formattedMeta}`;
};

export const logger = {
  info: (message: unknown, ...meta: unknown[]): void => {
    console.log(formatLog('INFO', message, meta));
  },
  warn: (message: unknown, ...meta: unknown[]): void => {
    console.warn(formatLog('WARN', message, meta));
  },
  error: (message: unknown, ...meta: unknown[]): void => {
    console.error(formatLog('ERROR', message, meta));
  },
  debug: (message: unknown, ...meta: unknown[]): void => {
    if (process.env['NODE_ENV'] !== 'production') {
      console.debug(formatLog('DEBUG', message, meta));
    }
  },
};
