import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Textarea,
  Flex,
  Text,
  TagsInput,
  OptionsFilter,
  ComboboxItem,
  Input,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useState } from "react";
import {
  IconCalendar,
  IconCheckbox,
  IconClock,
  IconPlus,
  IconTag,
  IconUser,
} from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuthContext } from "../../context/AuthContext";

const NewTask = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState("");
  const [assignee, setAssignee] = useState<string[]>([]);

  const [tags, setTags] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const authContext = useAuthContext();

  const assigneeFilter: OptionsFilter = ({ options, search }) => {
    const filtered = (options as ComboboxItem[]).filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };

  const handleCreateTask = async () => {
    try {
      const task = {
        Name: taskName,
        Date: date,
        Time: time,
        Assignee: assignee,
        Tags: tags,
      };
      const userId = authContext?.userCredential?.uid;
      const usersRef = doc(db, `users/${userId}/task`, taskName);
      await setDoc(usersRef, task);
      setMessage("Task added successfully");
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Task">
        <Flex gap="1rem" direction="column">
          <Text>{message}</Text>
          <Flex align="center" gap="md">
            <IconCheckbox stroke={1.5} />
            <Input
              placeholder="Name of Task"
              flex={1}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Flex>

          <Flex align="center" gap="md">
            <IconCalendar stroke={1.5} />
            <Text style={{ width: "3rem" }}>Date</Text>
            <DateInput
              value={date}
              onChange={setDate}
              flex={1}
              clearable
              defaultValue={new Date()}
            />
          </Flex>
          <Flex align="center" gap="md">
            <IconClock stroke={1.5} />
            <Text style={{ width: "3rem" }}>Time</Text>
            <TimeInput flex={1} onChange={(e) => setTime(e.target.value)} />
          </Flex>
          <Flex align="center" gap="md">
            <IconTag stroke={1.5} />
            <Text style={{ width: "3rem" }}>Tags</Text>
            <TagsInput
              placeholder="Enter tag"
              data={[]}
              value={tags}
              onChange={setTags}
              flex={1}
            />
          </Flex>
          <Flex align="center" gap="md">
            <IconUser stroke={1.5} />
            <Text style={{ width: "3rem" }}>Assign</Text>
            <TagsInput
              placeholder="Enter assignee"
              data={authContext?.userNameList}
              filter={assigneeFilter}
              flex={1}
              onChange={setAssignee}
            />
          </Flex>
          <Textarea label="Description" />
          <Button
            style={{ marginLeft: "auto" }}
            radius="xl"
            color="#1D2F6F"
            onClick={handleCreateTask}
          >
            Create task
          </Button>
        </Flex>
      </Modal>
      <Button
        onClick={open}
        leftSection={<IconPlus size="1rem" stroke={1.5} />}
        radius="xl"
        color="#1D2F6F"
      >
        New task
      </Button>
    </>
  );
};

export default NewTask;
