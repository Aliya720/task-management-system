import { AppShell, Flex } from "@mantine/core";

import Tasks from "../../components/Tasks/Tasks";

const MyTask = () => {
  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Flex
          style={{
            width: "60rem",
          }}
        >
          <Tasks />
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
};

export default MyTask;
