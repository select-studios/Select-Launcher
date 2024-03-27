import path from "path";
import fs from "fs";

class Log {
  public static info(msg: string, type?: string, args?: any) {
    const infoLog = `${this.getLogDate(new Date())}: INFO [${
      type ? type.toLowerCase() : "other"
    }] -> ${msg}`;

    this.writeLogToFile(infoLog);

    console.info(infoLog, args ? args : "");
  }

  public static success(msg: string, type?: string, args?: any) {
    const successLog = `${this.getLogDate(new Date())}: SUCCESS [${
      type ? type.toLowerCase() : "other"
    }] -> ${msg}`;

    this.writeLogToFile(successLog);

    console.log(successLog, args ? args : "");
  }

  public static warn(msg: string, type?: string, args?: any) {
    const warnLog = `${this.getLogDate(new Date())}: WARN [${
      type ? type.toLowerCase() : "other"
    }] -> ${msg}`;

    this.writeLogToFile(warnLog);

    console.warn(warnLog, args ? args : "");
  }

  public static ready(msg: string, type?: string, args?: any) {
    const readyLog = `${this.getLogDate(new Date())}: READY [${
      type ? type.toLowerCase() : "other"
    }] -> ${msg}`;

    this.writeLogToFile(readyLog);

    console.info(readyLog, args ? args : "");
  }

  public static error(msg: string, type?: string, args?: any) {
    const errorLog = `${this.getLogDate(new Date())}: ERROR [${
      type ? type.toLowerCase() : "other"
    }] -> ${msg}`;

    this.writeLogToFile(errorLog + "\n\n" + args);

    console.error(errorLog, args ? args : "");
  }

  private static getLogDate(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const dateStr = `${this.formatLogDate(hours)}:${this.formatLogDate(
      minutes
    )}:${this.formatLogDate(seconds)}`;
    return dateStr;
  }

  private static formatLogDate(time: number) {
    if (time < 10) return `0${time}`;
    else return time;
  }

  private static writeLogToFile(log: string) {
    const logDir = this.getLogDir();
    const logFilePath = path.join(logDir, "log.txt");

    fs.writeFileSync(logFilePath, log + "\n\n", { flag: "a" });
  }

  private static getLogDir() {
    const logDirPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "..",
      "..",
      "logs"
    );
    console.log(logDirPath);

    if (!fs.existsSync(logDirPath)) {
      fs.mkdirSync(logDirPath);
    }

    return logDirPath;
  }
}

export { Log };
