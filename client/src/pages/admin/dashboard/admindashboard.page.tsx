import { AppBar, Loader, Sidebar } from "@/components";
import { User, UserStore, UserStore_Impl } from "@/stores/UserStore";
import { BiAnalyse, BiChart, BiUser } from "react-icons/bi";
import {
  HiBan,
  HiChartBar,
  HiChartPie,
  HiCheck,
  HiDatabase,
  HiIdentification,
  HiMail,
  HiOutlineUser,
  HiRefresh,
  HiUser,
  HiX,
} from "react-icons/hi";
import { HiChartBarSquare, HiUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { banUser, getAllUsers, unbanUser } from "../../../handlers/api/index";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  Grid,
  Input,
  Link,
  Loading,
  Switch,
  Text,
} from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const user = UserStore.user;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  if (!user?.moderator) navigate("/home");

  const handleGetAllUsers = () => {
    setUsersLoading(true);
    getAllUsers()
      .then((allUsers) => {
        setUsers(allUsers);
        setUsersLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleBanUser = (userId: string) => {
    banUser(userId, "ssadmin12345").then((newUser) => {
      const filteredNewUsers = users.filter(
        (user: any) => user._id !== newUser._id
      );
      setUsers(
        [...filteredNewUsers, newUser].sort(
          (a: any, b: any) => a.username - b.username
        ) as any
      );
    });
  };

  const handleUnbanUser = (userId: string) => {
    unbanUser(userId, "ssadmin12345").then((newUser) => {
      const filteredUsers = users.filter(
        (user: any) => user._id !== newUser._id
      );
      setUsers(
        [...filteredUsers, newUser].sort(
          (a: any, b: any) => a.username - b.username
        ) as any
      );
    });
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);
  const handleUsersRefresh = () => {
    handleGetAllUsers();
  };

  return (
    <section className="admin-dashboard">
      <AppBar dashboard={true} user={UserStore.user!} />

      <div className="min-h-screen flex">
        <Sidebar active="dashboard" />
        <div className="main mt-10 min-w-fit">
          <div className="header mx-10">
            <p className="text-3xl flex items-center font-bold font-montserrat">
              <HiDatabase size="40" className="mr-2" /> Administrator Dashboard
            </p>
          </div>
          <div className="mt-10 bg-secondary pb-5 rounded-xl mx-10 w-full">
            <p className="text-xl rounded-t-xl text-center p-2 bg-tertiary mx-0 font-bold font-montserrat">
              App Users
            </p>
            {!usersLoading && (
              <div className="px-5 rounded-b-lg">
                <div className="mt-4 py-2 px-1 mx-10 w-auto rounded-lg bg-tertiary">
                  <p className="flex items-center justify-center text-2xl m-2 mb-4 text-center font-bold font-montserrat bg-secondary p-2 rounded-lg">
                    <HiChartPie size="30" className="mr-2" /> Analysis
                  </p>
                  <div className="flex justify-center min-w-full">
                    <div className="stat-card-1 max-w-fit p-3 rounded-md bg-secondary">
                      <p className="text-sm uppercase opacity-70 font-bold">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold font-montserrat">
                        {users.length}
                      </p>
                    </div>
                    <div className="stat-card-1 max-w-fit p-3 rounded-md bg-red-700 ml-2">
                      <p className="text-sm uppercase opacity-70 font-bold">
                        Banned Users
                      </p>
                      <p className="text-2xl font-bold font-montserrat">
                        {users.filter((user: any) => user.banned).length}
                      </p>
                    </div>
                    <div className="stat-card-1 max-w-fit p-3 rounded-md bg-yellow-600 ml-2">
                      <p className="text-sm uppercase opacity-70 font-bold">
                        Admins
                      </p>
                      <p className="text-2xl font-bold font-montserrat">
                        {users.filter((user: any) => user.moderator).length}
                      </p>
                    </div>
                    <div className="stat-card-1 min-w-max p-3 rounded-md bg-green-600 ml-2">
                      <p className="text-sm uppercase opacity-70 font-bold">
                        Verified Users
                      </p>
                      <p className="text-2xl font-bold font-montserrat">
                        {users.filter((user: any) => user.verified).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-5 mx-10 flex justify-between max-w-full items-center">
                  <Input
                    bordered
                    contentRight={<FiSearch size="20" />}
                    label="Search User"
                    onChange={(e) => {
                      let searchVal = e.target.value;
                      if (!searchVal.length) {
                        setFilteredUsers([]);
                      }

                      const newUsers = users.filter(
                        (user) =>
                          (user as any)._id.includes(searchVal) ||
                          (user as any).username.includes(searchVal)
                      );
                      setFilteredUsers(newUsers);
                    }}
                    placeholder="User ID / Username"
                    color="primary"
                  />
                  <div className="ml-5 flex items-center">
                    <p className="mr-2 font-medium">Verified Only </p>
                    <Switch
                      onChange={(checked) =>
                        checked
                          ? setFilteredUsers(
                              users.filter((user) => (user as any).verified)
                            )
                          : setFilteredUsers([])
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mx-10 mt-5 px-5 overflow-scroll bg-primary rounded-lg overflow-x-hidden max-h-96">
              {!usersLoading ? (
                <div className="allUsers grid grid-cols-2">
                  {(filteredUsers.length ? filteredUsers : users)
                    .sort((a: any, b: any) =>
                      a.username.localeCompare(b.username)
                    )
                    .map((user: any) => (
                      <Card
                        className={`bg-tertiary shadow-none max-w-lg mr-2 my-3 ${
                          user?.moderator ? "border border-yellow-400" : ""
                        }`}
                        css={{ p: "$6" }}
                        variant={user?.moderator ? "bordered" : "flat"}
                      >
                        <Card.Header>
                          <Avatar
                            icon={<BiUser size="25" className="font-bold" />}
                            className="mr-2 font-bold"
                            color="primary"
                            size="lg"
                            zoomed
                          />
                          <div className="pl-1">
                            <p className="font-bold text-lg font-montserrat">
                              <span className="opacity-70">@</span>
                              {user.username}
                            </p>
                            <p className="text-sm flex items-center opacity-70">
                              <HiMail className="mr-1" /> {user.email}{" "}
                              {user?.verified && (
                                <Badge
                                  size="sm"
                                  className="ml-2 border-0"
                                  variant="flat"
                                  color="success"
                                >
                                  <HiCheck className="mr-1" /> Verified
                                </Badge>
                              )}
                              {user?.moderator && (
                                <Badge
                                  size="sm"
                                  className="ml-2"
                                  variant="flat"
                                  color="warning"
                                >
                                  <HiUserPlus className="mr-1" /> Moderator
                                </Badge>
                              )}
                              {user?.banned && (
                                <Badge
                                  size="sm"
                                  className="ml-2"
                                  variant="flat"
                                  color="error"
                                >
                                  <HiBan className="mr-1" /> Banned
                                </Badge>
                              )}
                            </p>
                          </div>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                          <p className="items-center flex">
                            <HiIdentification className="mr-1" />{" "}
                            <b className="mr-1">User ID:</b> {user._id}
                          </p>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            auto
                            color="error"
                            className="mr-2"
                            icon={<HiBan size="20" />}
                            onPress={() => handleBanUser(user._id)}
                            disabled={user?.banned}
                          >
                            Ban
                          </Button>
                          {user?.banned && (
                            <Button
                              auto
                              color="error"
                              className="mr-2"
                              icon={<HiX size="20" />}
                              flat
                              onPress={() => handleUnbanUser(user._id)}
                            >
                              Unban
                            </Button>
                          )}
                          <Dropdown>
                            <Dropdown.Trigger>
                              <Dropdown.Button
                                disabled
                                className="bg-secondary"
                              >
                                More actions
                              </Dropdown.Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu className="bg-primary">
                              <Dropdown.Item className="font-bold">
                                Force Password Reset
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Card.Footer>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="flex w-full p-5 items-center justify-center">
                  <Loading />
                </div>
              )}
            </div>
            <div className="mx-10 mt-5">
              <Button
                auto
                className="bg-tertiary"
                onPress={() => handleUsersRefresh()}
                icon={<HiRefresh size="25" />}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
