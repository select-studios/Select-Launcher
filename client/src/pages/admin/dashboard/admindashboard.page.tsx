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
  HiUsers,
  HiX,
} from "react-icons/hi";
import { HiChartBarSquare, HiCheckBadge, HiUserPlus } from "react-icons/hi2";
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
  Modal,
  Switch,
  Text,
} from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { BsHammer } from "react-icons/bs";
import { validateInputComponent } from "@/utils/form";

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

  const handleBanUser = async (userId: string, reason: string) => {
    await banUser(userId, reason, user?.tokens.accessToken || "").then(
      (newUser) => {
        console.log(newUser);
        const filteredNewUsers = users.filter(
          (user: any) => user._id !== newUser._id
        );
        setUsers(
          [...filteredNewUsers, newUser].sort(
            (a: any, b: any) => a.username - b.username
          ) as any
        );
      }
    );
  };

  const handleUnbanUser = (userId: string) => {
    unbanUser(userId, user?.tokens.accessToken || "").then((newUser) => {
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

  const userAnalysis = [
    {
      icon: <HiUsers className="text-primary-base" />,
      title: "Total Users",
      value: users.length,
      color: "primary-base",
    },
    {
      icon: <HiBan className="text-red-600" />,
      title: "Banned Users",
      value: users.filter((user: any) => user.banned).length,
      color: "red-600",
    },
    {
      icon: <HiCheckBadge className="text-green-600" />,
      title: "Verified Users",
      value: users.filter((user: any) => user.verified).length,
      color: "green-600",
    },
    {
      icon: <HiUserPlus className="text-yellow-600" />,
      title: "Moderators",
      value: users.filter((user: any) => user.moderator).length,
      color: "yellow-600",
    },
  ];

  const [banUserVisible, setBanUserVisible] = useState(false);
  const [userToBan, setUserToBan] = useState<any>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });

  const onUserBanSubmit = (data: any) => {
    handleBanUser(userToBan._id, data.reason);
    setBanUserVisible(false);
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
              <div className=" flex rounded-b-lg">
                <div className="mt-4 py-2 px-1 mx-10 rounded-lg bg-tertiary">
                  <p className="flex items-center justify-center text-2xl m-2 mb-4 text-center font-bold font-montserrat bg-secondary p-2 rounded-lg">
                    <HiChartPie size="30" className="mr-2" /> Analysis
                  </p>
                  <div className="flex justify-center min-w-full px-3">
                    {!usersLoading &&
                      userAnalysis.map((analysis, key) => (
                        <div
                          key={key}
                          className={`stat-card-${key} p-3 mr-1 rounded-md bg-secondary border-2 border-solid border-${analysis.color}`}
                        >
                          <p className="flex items-center text-sm uppercase opacity-70 font-bold">
                            <span className="mr-1">{analysis.icon}</span>{" "}
                            {analysis.title}
                          </p>
                          <p className="text-2xl font-bold font-montserrat">
                            {analysis.value}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="my-5 mx-10 flex justify-between max-w-full items-center h-full">
                  <Input
                    bordered
                    contentRight={<FiSearch size="20" />}
                    label="Search Users"
                    size="lg"
                    onChange={(e) => {
                      let searchVal = e.target.value;
                      if (!searchVal.length) {
                        setFilteredUsers([]);
                      }

                      const newUsers = users.filter((user) =>
                        (user as any).username
                          .toLowerCase()
                          .includes(searchVal.toLowerCase())
                      );
                      setFilteredUsers(newUsers);
                    }}
                    placeholder="Username"
                    color="primary"
                  />
                  <div className="ml-5 flex items-center mt-5">
                    <p className="mr-2 font-medium">Verified Only </p>
                    <Switch
                      color="success"
                      onChange={(e) =>
                        e.target.checked
                          ? setFilteredUsers(
                              (filteredUsers.length
                                ? filteredUsers
                                : users
                              ).filter((user) => (user as any).verified)
                            )
                          : setFilteredUsers([])
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mx-10 mt-5 px-5 py-5 overflow-scroll bg-tertiary rounded-lg overflow-x-hidden max-h-96">
              {!usersLoading ? (
                <div className="allUsers m-2 grid grid-cols-2">
                  {(filteredUsers.length ? filteredUsers : users)
                    .sort((a: any, b: any) =>
                      a.username.localeCompare(b.username)
                    )
                    .map((user: any, key) => (
                      <Card
                        className={`bg-secondary shadow-none max-h-fit max-w-xl mr-2 mb-2 my-3 ${
                          user?.moderator ? "border border-yellow-400" : ""
                        }`}
                        key={`User-${key}`}
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
                          <br />
                          {user?.banned && (
                            <p>
                              <b>Ban Reason: </b> {user.banReason}
                            </p>
                          )}
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            auto
                            color="error"
                            className="mr-2"
                            icon={<HiBan size="20" />}
                            // onPress={() =>
                            //   handleBanUser(user._id, "Not disclosed")
                            // }
                            onPress={() => {
                              setBanUserVisible(true);
                              setUserToBan(user);
                            }}
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
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={banUserVisible}
        onClose={() => setBanUserVisible(false)}
      >
        <form onSubmit={handleSubmit(onUserBanSubmit)}>
          <Modal.Header justify="flex-start">
            <p className="text-2xl font-bold flex items-center">
              <HiBan size="20" className="mr-2" /> Ban User
            </p>
          </Modal.Header>
          <Modal.Header className="grid justify-center">
            <Avatar
              src="https://i.imgur.com/c30fFsi.png"
              className="mx-auto mb-2"
            />
            <p className="text-xl opacity-80 font-bold">
              @{userToBan.username}
            </p>
          </Modal.Header>
          <Modal.Body className="mt-2">
            <Input
              bordered
              fullWidth
              color={validateInputComponent(errors, "reason", true)}
              helperColor={validateInputComponent(errors, "reason", true)}
              helperText={validateInputComponent(errors, "reason", false)}
              size="lg"
              label="Ban Reason"
              placeholder="Type here"
              {...register("reason", {
                required: "You must enter a reason for banning that user.",
                minLength: 2,
              })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto color="error" type="submit">
              Ban
            </Button>
            <Button
              auto
              flat
              color="error"
              onPress={() => {
                setBanUserVisible(false);
                reset();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </section>
  );
};

export default AdminDashboard;
