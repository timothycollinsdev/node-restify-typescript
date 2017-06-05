import {createLogger} from 'bunyan'

export class ApiLogger {
    static readonly auditLoggerName = "ConfigServiceAuditLogger";
    static readonly apiLoggerName = "ConfigServiceLogger";


    public createLogger() : Map<String, any> {

        let appLog = createLogger({name: ApiLogger.apiLoggerName, level: 'debug'});

        let auditLog = createLogger({
            name: ApiLogger.auditLoggerName,
            stream: process.stdout
        });

        let loggerMap = new Map();
        loggerMap.set(ApiLogger.apiLoggerName, appLog);
        loggerMap.set(ApiLogger.auditLoggerName, auditLog);

        return loggerMap;
    }
}


