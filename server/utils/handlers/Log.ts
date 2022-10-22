import { Consola } from "consola";

const consola: Consola = require("consola");

class Log {
  private time: Date = new Date();

  public info(msg: string, type?: string) {
    consola.info(
      `${this.getLogDate(this.time)} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public success(msg: string, type?: string) {
    consola.success(
      `${this.getLogDate(this.time)} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public warn(msg: string, type?: string) {
    consola.warn(
      `${this.getLogDate(this.time)} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public ready(msg: string, type?: string) {
    consola.ready(
      `${this.getLogDate(this.time)} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}`
    );
  }

  public error(msg: string, err: Error, type?: string) {
    consola.error(
      `${this.getLogDate(this.time)} [${
        type ? type.toLowerCase() : "other"
      }] -> ${msg}\n\n`,
      err
    );
  }

  private getLogDate(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const dateStr = `${this.formatLogDate(hours)}:${this.formatLogDate(
      minutes
    )}:${this.formatLogDate(seconds)}`;
    return dateStr;
  }

  private formatLogDate(time: number) {
    if (time < 10) return `0${time}`;
    else return time;
  }
}

export { Log };
