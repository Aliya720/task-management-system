import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuthContext } from "../../context/AuthContext";
import {
  Accordion,
  AppShell,
  Avatar,
  AvatarGroup,
  Badge,
  Flex,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { TaskType } from "./TaskType";
import { IconCheck } from "@tabler/icons-react";

const MyTask = () => {
  const [taskList, setTaskList] = useState<TaskType[] | undefined>();
  const authContext = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [IsHovered, setIsHovered] = useState(false);

  const userId = authContext?.userCredential?.uid;

  const getTask = async () => {
    try {
      const taskCollectionRef = collection(db, `users/${userId}/task`);
      const taskSnapshot = await getDocs(taskCollectionRef);
      const tasks = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskList(tasks);
    } catch (error) {
      console.log("task not found");
    }
  };

  useEffect(() => {
    getTask();
  }, [userId]);

  const sortedTasks = taskList?.sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "completed") return 1;
    return -1;
  });

  const handleEditTask = async (taskName: string) => {
    setIsAdmin(false);
    const taskRef = doc(db, `users/${userId}/task`, taskName);
    await updateDoc(taskRef, {
      status: "completed",
    });
  };

  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Flex
          style={{
            width: "60rem",
          }}
        >
          <Accordion
            chevronPosition="right"
            variant="separated"
            m="md"
            flex={1}
          >
            {sortedTasks?.map((task) => (
              <Accordion.Item key={task.name} value={task.name} m="md">
                <Accordion.Control
                  onClick={(e) => e.stopPropagation()}
                  p="md"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  disabled={task.status === "completed"}
                >
                  <Flex justify="space-between">
                    <AvatarGroup>
                      {task.assignee.map((assigneeName) => (
                        <Avatar
                          key={assigneeName}
                          color="initials"
                          name={assigneeName}
                        >
                          {assigneeName}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    <Title order={4}>{task.name.toUpperCase()}</Title>{" "}
                    <Text size="xs" c="dimmed">
                      Due: {task.dueDate}
                    </Text>{" "}
                    <Badge
                      color={
                        task.status === "completed" ? "#1d2f6f" : "#A02C41"
                      }
                    >
                      {task.status}
                    </Badge>
                    <UnstyledButton onClick={() => handleEditTask(task.name)}>
                      <IconCheck
                        style={{
                          visibility: IsHovered ? "visible" : "hidden",
                        }}
                      />
                    </UnstyledButton>
                    {isAdmin ? (
                      <UnstyledButton>Edit Task</UnstyledButton>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Accordion.Control>
                <Accordion.Panel>
                  {/* <Title order={5}>Assignee : {assigneeName}</Title> */}
                  <Text size="sm">{task.description}</Text>
                  <Text>
                    {task.tags.map((tag) => (
                      <>#{tag}</>
                    ))}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
};

export default MyTask;
