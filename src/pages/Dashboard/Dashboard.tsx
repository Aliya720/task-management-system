import { AppShell, Box, Card, Center, Flex, Title } from "@mantine/core";
import Tasks from "../../components/Tasks/Tasks";
import MyCalendar from "../../components/Calendar/Calendar";

const Dashboard = () => {
  return (
    <AppShell p="md">
      <AppShell.Main>
        <Flex
          style={{
            width: "70rem",
          }}
          gap="3rem"
        >
          <Card
            withBorder
            shadow="sm"
            padding="sm"
            radius="md"
            style={{
              marginBottom: "auto",
            }}
          >
            <Center>
              <MyCalendar />
            </Center>
          </Card>
          <Card
            withBorder
            shadow="sm"
            padding="sm"
            radius="md"
            style={{ width: "30rem", height: "30rem", overflow: "auto" }}
          >
            <Title order={3}>My tasks</Title>
            <Box style={{ width: "100%", height: "100%" }}>
              <Tasks />
            </Box>
          </Card>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
