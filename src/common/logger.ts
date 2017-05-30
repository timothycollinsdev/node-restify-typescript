import * as bunyan from 'bunyan'

class Logger {
    public appLog;
    public auditLog;

    constructor() {
        this.appLog = bunyan.createLogger({ name: 'myapp', level: 'debug' });
        this.auditLog = bunyan.createLogger({
            name: 'audit',
            stream: process.stdout
        });
    }
}

export default new Logger()
