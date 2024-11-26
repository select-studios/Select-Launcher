import { ipcMain } from "electron";
import { signIn, signUp } from "../api/routes/accounts";
import { testConnection } from "../api";

function runSelectAPIEvents() {
  ipcMain.on("test-connection", async (event) => {
    const result = await testConnection();
    if (result === false) {
      event.returnValue = "Failed to connect to server";
    } else {
      event.returnValue = "Connected to server";
    }
  });
  ipcMain.on(
    "accounts-signup",
    async (
      event,
      username: string,
      email: string,
      backup_email: string,
      password: string
    ) => {
      const result = await signUp(email, backup_email, username, password);

      event.returnValue = result;
    }
  );
  ipcMain.on(
    "accounts-signin",
    async (
      event,
      email: string,
      password: string
    ) => {
      const result = await signIn(email, password);

      event.returnValue = result;
    }
  );
}

export default runSelectAPIEvents;
