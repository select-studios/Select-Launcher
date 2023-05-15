import { AppBar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import { BiChart, BiUser } from "react-icons/bi";
import {
  HiBan,
  HiChartBar,
  HiCheck,
  HiDatabase,
  HiMail,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi";
import { HiChartBarSquare, HiUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../handlers/api/index";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  Grid,
  Link,
  Text,
} from "@nextui-org/react";

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const user = UserStore.user;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  if (!user?.moderator) navigate("/home");

  useEffect(() => {
    getAllUsers()
      .then((allUsers) => setUsers(allUsers))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="admin-dashboard">
      <AppBar dashboard={true} user={UserStore.user!} />
      <div className="min-h-screen">
        <div className="main ml-10 mt-10">
          <div className="header">
            <p className="text-3xl flex items-center font-bold font-montserrat">
              <HiDatabase size="40" className="mr-2" /> Administrator Dashboard
            </p>
          </div>
          <div className="mt-10 max-w-4xl bg-secondary pb-5 rounded-xl ml-0 mx-auto">
            <p className="text-xl rounded-t-xl text-center p-2 bg-tertiary mx-0 font-bold font-montserrat">
              App Users (A-Z)
            </p>
            <div className="mx-10 mt-10 overflow-scroll bg-secondary overflow-x-hidden max-h-96">
              {users
                .sort((a: any, b: any) => a.username.localeCompare(b.username))
                .map((user: any) => (
                  <Card
                    className={`bg-tertiary shadow-none my-3 max-w-3xl ${
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
                              className="ml-2"
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
                        </p>
                      </div>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                      <p>
                        <b>User ID:</b> {user._id}
                      </p>
                    </Card.Body>
                    <Card.Footer>
                      <Button
                        auto
                        color="error"
                        className="mr-2"
                        icon={<HiBan size="20" />}
                      >
                        Ban
                      </Button>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <Dropdown.Button className="bg-secondary">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
