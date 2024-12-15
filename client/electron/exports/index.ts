import { ipcMain } from "electron";
import {
  forgotPassword,
  logout,
  refresh,
  signIn,
  signUp,
} from "../api/routes/accounts";
import { testConnection } from "../api";
import { editAccount, uploadPFP } from "../api/routes/accounts/edit/profile";
import { addGame, removeGame } from "../api/routes/accounts/edit/game";
import { getGamesInfo } from "../api/routes/games";
import { banUser, unBan } from "../api/routes/moderation/mod";

function runSelectAPIEvents() {
  ipcMain.on("test-connection", async (event) => {
    const result = await testConnection();
    if (result === false) {
      event.returnValue = "Failed to connect to server";
    } else {
      event.returnValue = "Connected to server";
    }
  });
  //#region Accounts API
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
    async (event, email: string, password: string) => {
      const result = await signIn(email, password);

      event.returnValue = result;
    }
  );
  ipcMain.on("accounts-refresh", async (event, refreshToken: string) => {
    const result = await refresh(refreshToken);

    event.returnValue = result;
  });
  ipcMain.on("accounts-logout", async (event, accessToken: string) => {
    const result = await logout(accessToken);

    event.returnValue = result;
  });
  ipcMain.on(
    "accounts-forgotPassword",
    async (event, uuid: string, newPassword: string) => {
      const result = await forgotPassword(uuid, newPassword);

      event.returnValue = result;
    }
  );
  //#region Account Edit API
  ipcMain.on(
    "accounts-edit-editAccount",
    async (event, username: string, email: string, accessToken: string) => {
      const result = editAccount(username, email, accessToken);

      event.returnValue = result;
    }
  );
  ipcMain.on(
    "accounts-edit-uploadPFP",
    async (event, avatarLocation: string, accessToken: string) => {
      const result = await uploadPFP(avatarLocation, accessToken);

      event.returnValue = result;
    }
  );
  ipcMain.on(
    "accounts-edit-addGame",
    async (event, newGame: string, accessToken: string) => {
      const result = await addGame(newGame, accessToken);

      event.returnValue = result;
    }
  );
  ipcMain.on(
    "accounts-edit-removeGame",
    async (event, oldGame: string, accessToken: string) => {
      const result = await removeGame(oldGame, accessToken);

      event.returnValue = result;
    }
  );
  //#endregion
  //#endregion
  //#region GamesAPI
  ipcMain.on("games-getGamesInfo", async (event) => {
    const result = await getGamesInfo();

    event.returnValue = result;
  });
  //#endregion
  //#region Moderation API
  ipcMain.on(
    "moderation-banUser",
    async (event, uuid: string, reason: string, accessToken: string) => {
      const result = await banUser(uuid, reason, accessToken);

      event.returnValue = result;
    }
  );
  ipcMain.on(
    "moderation-unBan",
    async (event, uuid: string, accessToken: string) => {
      const result = await unBan(uuid, accessToken);

      event.returnValue = result;
    }
  );
  //#endregion
}

export default runSelectAPIEvents;
