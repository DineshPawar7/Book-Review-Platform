import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logToFile = (level, message, meta = '') => {
    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ''}\n`;
    fs.appendFile(path.join(logsDir, 'app.log'), logEntry, (err) => {
        if (err) console.error('Logging failed:', err);
    });
};

const logger = {
    info: (message, meta) => {
        console.log(`INFO: ${message}`, meta || '');
        logToFile('info', message, meta);
    },
    warn: (message, meta) => {
        console.warn(`WARN: ${message}`, meta || '');
        logToFile('warn', message, meta);
    },
    error: (message, meta) => {
        console.error(`ERROR: ${message}`, meta || '');
        const errorMeta = meta instanceof Error ? { ...meta, message: meta.message, stack: meta.stack } : meta;
        logToFile('error', message, errorMeta);
    }
};


export default logger;