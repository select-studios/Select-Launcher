import { axiosInstance } from "../main";

/// Initializes connection with the server
export function testConnection() {
  // TODO check for stored user logins
  return axiosInstance.get("games/info").then((res) => {
    if (res.status === 200) {
      console.log("Select server is online!");
      return true;
    } else {
      console.log("Could not reach select server!");
      return false;
    }
  });
}
