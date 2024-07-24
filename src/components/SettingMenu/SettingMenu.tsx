import { Button, Menu } from "@mantine/core";
import { IconBell, IconSettings, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SettingMenu = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
        <Menu.Target>
          <Button
            variant="default"
            leftSection={<IconSettings size="1rem" stroke={1.5} />}
            style={{ border: "none" }}
          >
            Settings
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>settings</Menu.Label>
          <NavLink to="/user/profile">
            <Menu.Item
              leftSection={
                <IconUser style={{ width: "rem(14)", height: "rem(14)" }} />
              }
            >
              Profile
            </Menu.Item>
          </NavLink>
          <NavLink to="/user/notification">
            <Menu.Item
              leftSection={
                <IconBell style={{ width: "rem(14)", height: "rem(14)" }} />
              }
            >
              Notification
            </Menu.Item>
          </NavLink>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default SettingMenu;
