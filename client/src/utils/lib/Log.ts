class Log {
  public static info(msg: string, type?: string) {
    console.info(
      `${this.getLogDate(new Date())} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public static success(msg: string, type?: string) {
    console.log(
      `${this.getLogDate(new Date())} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public static warn(msg: string, type?: string) {
    console.warn(
      `${this.getLogDate(new Date())} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public static ready(msg: string, type?: string) {
    console.info(
      `${this.getLogDate(new Date())} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public static error(msg: string, err: Error, type?: string) {
    console.error(
      `${this.getLogDate(new Date())} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}\n\n`,
      err
    );
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
}

export { Log };
