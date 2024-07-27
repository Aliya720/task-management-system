import { NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const SettingMenu = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="Settings"
        leftSection={<IconSettings size="1rem" stroke={1.5} />}
        childrenOffset={28}
        active={opened}
        onClick={toggle}
      >
        <NavLink
          to="/user/profile"
          component={Link}
          label="profile"
          leftSection={<IconUser size="1rem" stroke={1.5} />}
        />
      </NavLink>
    </>
  );
};

export default SettingMenu;
