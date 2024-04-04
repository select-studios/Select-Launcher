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
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Input,
  Link,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  Checkbox,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/badge";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { BsHammer } from "react-icons/bs";
import { validateInputColor } from "@/utils/form";
import { toast } from "react-toastify";

interface AdminDashboardProps {}

const ModeratorDashboard: React.FC<AdminDashboardProps> = () => {
  const user = UserStore.user;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  if (!user?.moderator) navigate("/store");

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

      toast.success(`@${newUser.username} has been banned`);
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
      title: "Total",
      value: users.length,
      color: "primary-base",
    },
    {
      icon: <HiBan className="text-red-600" />,
      title: "Banned",
      value: users.filter((user: any) => user.banned).length,
      color: "red-600",
    },
    {
      icon: <HiCheckBadge className="text-green-600" />,
      title: "Verified",
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
    toast.success(
      `@${userToBan.username} successfully banned from the servers.`
    );
  };

  return (
    <section className="admin-dashboard">
      <div className="flex mr-5">
        <Sidebar active="moderation" />
        <div>
          {" "}
          <AppBar pageName="Mod" dashboard={true} user={UserStore.user!} />
          <div className="min-w-fit">
            <div className="mt-2 overflow-scroll bg-secondaryBG pb-5 rounded-xl w-full">
              <p className="text-xl p-2 rounded-t-xl text-center bg-tertiaryBG mx-0 font-heading">
                App Users
              </p>
              {!usersLoading && (
                <div className="flex items-center rounded-b-lg">
                  <div className="mt-4 py-2 px-1 mx-10 rounded-lg bg-tertiaryBG">
                    <div className="flex justify-center min-w-full px-3">
                      {!usersLoading &&
                        userAnalysis.map((analysis, key) => (
                          <div
                            key={key}
                            className={`stat-card-${key} px-2 py-1 mr-1 rounded-md bg-secondaryBG border-2 border-solid border-${analysis.color}`}
                          >
                            <p className="flex items-center text-sm uppercase opacity-70 font-bold">
                              <span className="mr-1">{analysis.icon}</span>{" "}
                              {analysis.title}
                            </p>
                            <p className="text-2xl font-bold font-heading">
                              {analysis.value}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="my-auto mx-10 flex justify-between max-w-full items-center">
                    <Input
                      variant="bordered"
                      endContent={<FiSearch size="20" />}
                      label="Search Users"
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
                      <Checkbox
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
                      >
                        Verified
                      </Checkbox>
                    </div>
                  </div>
                </div>
              )}

              <div className="mx-10 mt-10 px-5 py-5 bg-tertiaryBG rounded-lg overflow-x-hidden max-h-96">
                {!usersLoading ? (
                  <div className="allUsers m-2 grid grid-cols-2">
                    {(filteredUsers.length ? filteredUsers : users)
                      .sort((a: any, b: any) =>
                        a.username.localeCompare(b.username)
                      )
                      .map((user: any, key) => (
                        <Card
                          className={`bg-secondaryBG shadow-none max-h-fit max-w-xl mr-2 mb-2 my-3 p-6 ${
                            user?.moderator ? "border border-yellow-400" : ""
                          }`}
                          key={`User-${key}`}
                        >
                          <CardHeader>
                            <Avatar
                              icon={<BiUser size="25" className="font-bold" />}
                              className="mr-2 font-bold"
                              color="primary"
                              size="lg"
                            />
                            <div className="pl-1">
                              <p className="text-lg font-heading">
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
                                    color="danger"
                                  >
                                    <HiBan className="mr-1" /> Banned
                                  </Badge>
                                )}
                              </p>
                            </div>
                          </CardHeader>
                          <CardBody className="py-2">
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
                          </CardBody>
                          <CardFooter>
                            <Button
                              color="danger"
                              className="mr-2 w-auto"
                              startContent={<HiBan size="20" />}
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
                                color="danger"
                                className="mr-2 w-auto"
                                startContent={<HiX size="20" />}
                                variant="flat"
                                onPress={() => handleUnbanUser(user._id)}
                              >
                                Unban
                              </Button>
                            )}
                            <Dropdown>
                              <DropdownTrigger>
                                <Button className="bg-tertiaryBG">
                                  More actions
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu className="bg-tertiaryBG">
                                <DropdownItem
                                  description="Forces the user to change their password."
                                  className="font-bold"
                                >
                                  Issue Password Reset
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex w-full p-5 items-center justify-center">
                    <Loader />
                  </div>
                )}
              </div>
              <div className="mx-10 my-5">
                <Button
                  className="bg-tertiaryBG w-auto"
                  onPress={() => handleUsersRefresh()}
                  startContent={<HiRefresh size="25" />}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={banUserVisible}
        onClose={() => setBanUserVisible(false)}
      >
        <form onSubmit={handleSubmit(onUserBanSubmit)}>
          <ModalHeader className="justify-start">
            <p className="text-2xl font-bold flex items-center">
              <HiBan size="20" className="mr-2" /> Ban User
            </p>
          </ModalHeader>
          <ModalHeader className="grid justify-center">
            <Avatar
              src="https://i.imgur.com/c30fFsi.png"
              className="mx-auto mb-2"
            />
            <p className="text-xl opacity-80 font-bold">
              @{userToBan.username}
            </p>
          </ModalHeader>
          <ModalBody className="mt-2">
            <Input
              variant="bordered"
              fullWidth
              color={validateInputColor(errors, "reason", true)}
              size="lg"
              label="Ban Reason"
              placeholder="Type here"
              {...register("reason", {
                required: "You must enter a reason for banning that user.",
                minLength: 2,
              })}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="w-auto" color="danger" type="submit">
              Ban
            </Button>
            <Button
              variant="flat"
              className="w-auto"
              color="danger"
              onPress={() => {
                setBanUserVisible(false);
                reset();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </section>
  );
};

export default ModeratorDashboard;
