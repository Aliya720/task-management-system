import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  Avatar,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChecklist,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import NewTask from "../NewTask/NewTask";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SettingMenu from "../SettingMenu/SettingMenu";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import SearchInput from "../SearchInput/SearchInput";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();
  const authContext = useAuthContext();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title order={1} style={{ color: "#1D2F6F" }}>
              TMS
            </Title>
            {/* <TextInput
              placeholder="Search"
              rightSection={<IconSearch size="1rem" stroke={1.5} />}
              visibleFrom="sm"
              style={{ width: "30rem" }}
              radius="xl"
            /> */}
            <SearchInput />
            <Group ml="xl" gap={20}>
              <NewTask />

              <Avatar
                src={authContext?.userData?.image}
                component={Link}
                to="/user/profile"
                alt="it's me"
                color="#1D2F6F"
              />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" h="100%">
        <Flex
          direction="column"
          gap="1rem"
          style={{
            height: "90%",
          }}
        >
          <NavLink
            component={Link}
            to="/user/dashboard"
            label="Dashboard"
            leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
            active={isActive("/user/dashboard")}
          />
          <NavLink
            component={Link}
            to="/user/my-task"
            label="My Task"
            leftSection={<IconChecklist size="1rem" stroke={1.5} />}
            active={isActive("/user/my-task")}
          />
          {/* <NavLink
              component={Link}
              to="/user/notification"
              label="Notification"
              leftSection={<IconBellRinging size="1rem" stroke={1.5} />}
            /> */}
          {authContext?.isAdminLoggedIn ? (
            <>
              <NavLink
                component={Link}
                to="/admin/users"
                label="Users"
                leftSection={<IconUser size="1rem" stroke={1.5} />}
                active={isActive("/admin/users")}
              />
            </>
          ) : (
            <></>
          )}

          <Group style={{ marginTop: "auto" }}>
            <SettingMenu />
            <LogOutBtn />
          </Group>
        </Flex>
      </AppShell.Navbar>
    </AppShell>
  );
};

export default Navbar;
