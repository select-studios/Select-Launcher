interface UserSettingsProps {}

import { Loader, LoadingState } from "@/components/loader/loader.component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getTokensCookie } from "@/utils/storage";
import { logout } from "@/handlers/api";
import protectRoute from "@/handlers/api/utils/protectRoute";
import { AppBar } from "@/components";
import { Input, Link } from "@nextui-org/react";

const UserSettings: React.FC<UserSettingsProps> = () => {
  const cookies = getTokensCookie();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });

  const navigate = useNavigate();

  const logoutClient = () => {
    cookies && logout(cookies.refreshToken || "", setLoading, navigate);
  };

  useEffect(() => {
    protectRoute(cookies, setUser, setLoading, navigate);
  }, []);

  return !loading ? (
    <div>
      <AppBar dashboard user={user} logoutFn={logoutClient} />
      <form className="mt-5">
        <Input type="file" name="avatar" id="avatar" />
      </form>
      <Link href="/">home go</Link>
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};

export default UserSettings;
