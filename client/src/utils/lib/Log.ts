class Log {
  public static info(msg: string, type?: string, args?: any) {
    console.info(
      `${this.getLogDate(new Date())}: INFO [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`,
      args ? args : ""
    );
  }

  public static success(msg: string, type?: string, args?: any) {
    console.log(
      `${this.getLogDate(new Date())}: SUCCESS [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`,
      args ? args : ""
    );
  }

  public static warn(msg: string, type?: string, args?: any) {
    console.warn(
      `${this.getLogDate(new Date())}: WARN [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`,
      args ? args : ""
    );
  }

  public static ready(msg: string, type?: string, args?: any) {
    console.info(
      `${this.getLogDate(new Date())}: READY [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`,
      args ? args : ""
    );
  }

  public static error(msg: string, type?: string, args?: any) {
    console.log(
      `${this.getLogDate(new Date())}: ERROR [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`,
      args ? args : ""
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
