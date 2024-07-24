import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuthContext } from "../../context/AuthContext";
import {
  Accordion,
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

const Tasks = () => {
  const [taskList, setTaskList] = useState<TaskType[] | undefined>();
  const authContext = useAuthContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [IsHovered, setIsHovered] = useState(false);

  const userId = authContext?.userCredential?.uid;

  //to get task list from firebase
  const getTask = async () => {
    try {
      const taskCollectionRef = collection(db, `users/${userId}/task`);
      const taskSnapshot = await getDocs(taskCollectionRef);
      const tasks = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTaskList(tasks);
      authContext?.setTaskList(tasks);
    } catch (error) {
      console.log("task not found");
    }
  };

  //useEffect for updating task list every time new task added
  useEffect(() => {
    getTask();
  }, [userId]);

  // to make incomplete task above and complete at the bottom
  const sortedTasks = taskList?.sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "completed") return 1;
    return -1;
  });

  //to update task is completed or not
  const UpdateTaskStatus = async (taskName: string) => {
    setIsAdmin(false);
    const taskRef = doc(db, `users/${userId}/task`, taskName);
    await updateDoc(taskRef, {
      status: "completed",
    });
  };

  return (
    <>
      <Accordion chevronPosition="right" variant="separated" m="md" flex={1}>
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
                  color={task.status === "completed" ? "#1d2f6f" : "#A02C41"}
                >
                  {task.status}
                </Badge>
                <UnstyledButton onClick={() => UpdateTaskStatus(task.name)}>
                  <IconCheck
                    style={{
                      visibility: IsHovered ? "visible" : "hidden",
                    }}
                  />
                </UnstyledButton>
                {isAdmin ? <UnstyledButton>Edit Task</UnstyledButton> : <></>}
              </Flex>
            </Accordion.Control>
            <Accordion.Panel>
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
    </>
  );
};

export default Tasks;
