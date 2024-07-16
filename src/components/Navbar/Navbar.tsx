import {
  AppShell,
  Burger,
  Group,
  Title,
  TextInput,
  NavLink,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBellRinging,
  IconChecklist,
  IconLayoutDashboard,
  IconLogout,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import NewTask from "../NewTask/NewTask";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();

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
            <TextInput
              placeholder="Search"
              rightSection={<IconSearch size="1rem" stroke={1.5} />}
              visibleFrom="sm"
              style={{ width: "30rem" }}
              radius="xl"
            />
            <Group ml="xl" gap={20}>
              <NewTask />

              <Avatar
                src="avatar.png"
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
        <Group
          style={{
            flexDirection: "column",
            height: "90%",
            justifyContent: "space-between",
            alignContent: "flex-start",
          }}
        >
          <Group style={{ flexDirection: "column" }}>
            <NavLink
              href="/user/dashboard"
              label="Dashboard"
              leftSection={<IconLayoutDashboard size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="/user/my-task"
              label="My Task"
              leftSection={<IconChecklist size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="/"
              label="Notification"
              leftSection={<IconBellRinging size="1rem" stroke={1.5} />}
            />
          </Group>
          <Group style={{ flexDirection: "column" }}>
            <NavLink
              href="/"
              label="Settings"
              leftSection={<IconSettings size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="/"
              label="Logout"
              leftSection={<IconLogout size="1rem" stroke={1.5} />}
            />
          </Group>
        </Group>
      </AppShell.Navbar>
    </AppShell>
  );
};

export default Navbar;
