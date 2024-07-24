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
  Select,
} from "@mantine/core";
import { DateInput, DateTimePicker } from "@mantine/dates";
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
import { useForm } from "@mantine/form";
import { NewTaskFormType } from "./form.type";

const NewTask = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const authContext = useAuthContext();
  // For user name list
  const userNameList: string[] | undefined = authContext?.userList.map(
    (user) => {
      return `${user.firstName} ${user.secondName}`;
    }
  );

  // To Remove selected assignee from Options
  const assigneeFilter: OptionsFilter = ({ options, search }) => {
    const filtered = (options as ComboboxItem[]).filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };

  // To update due date according to time stamp selected
  const GeneralFibonacciSeries = (n: number): number[] => {
    if (n <= 0) return [0];
    if (n === 1) return [0, 1];

    let series: number[] = [1, 2];
    for (let i = 2; i <= n; i++) {
      series = [...series, series[i - 1] + series[i - 2]];
    }
    return series;
  };
  const timeSlotList = GeneralFibonacciSeries(9).map((num, idx) => ({
    value: num.toString(),
    label: (idx + 1).toString(),
  }));

  const updateDueDate = (time: number) => {
    const date = new Date();
    const extendedTime = 6 * time;
    const currentTime = date.getTime();
    const newDueDate = new Date(currentTime + extendedTime * 60 * 60 * 1000);
    setDueDate(newDueDate);
  };

  const form = useForm<NewTaskFormType>({
    initialValues: {
      taskName: "",
      tags: [],
      assignee: [
        authContext?.isAdminLoggedIn
          ? ""
          : `${authContext?.userData?.firstName} ${authContext?.userData?.secondName}`,
      ],
      description: "",
    },
    validate: {
      taskName: (value) => (value ? null : "TaskName can not be Empty"),
    },
  });

  const handleCreateTask = async (values: NewTaskFormType) => {
    try {
      const task = {
        name: values.taskName,
        dueDate: dueDate,
        assignee: values.assignee,
        tags: values.tags,
        description: values.description,
        status: "in-progress",
      };
      const userId = authContext?.userCredential?.uid;
      const usersRef = doc(db, `users/${userId}/task`, values.taskName);
      await setDoc(usersRef, task);
      setMessage("Task added successfully");
      if (!opened) {
        setMessage("");
      }
      form.reset();
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Task">
        <form onSubmit={form.onSubmit(handleCreateTask)}>
          <Flex gap="1rem" direction="column">
            <Text c="green">{message}</Text>
            <Flex align="center" gap="md">
              <IconCheckbox stroke={1.5} />
              <Input
                placeholder="Name of Task"
                flex={1}
                {...form.getInputProps("taskName")}
              />
            </Flex>
            <Flex align="center" gap="md">
              <IconCalendar stroke={1.5} />
              <Text style={{ width: "3rem" }}>Date</Text>
              <DateTimePicker
                value={dueDate}
                flex={1}
                clearable
                defaultValue={new Date()}
              />
            </Flex>
            <Flex align="center" gap="md">
              <IconClock stroke={1.5} />
              <Text style={{ width: "3rem" }}>Time</Text>
              <Select
                placeholder="select time"
                data={timeSlotList}
                onChange={(value) => {
                  const numericValue = parseInt(value, 10);
                  updateDueDate(numericValue);
                }}
                flex={1}
              />
            </Flex>
            <Flex align="center" gap="md">
              <IconTag stroke={1.5} />
              <Text style={{ width: "3rem" }}>Tags</Text>
              <TagsInput
                placeholder="Enter tag"
                data={[]}
                {...form.getInputProps("tags")}
                flex={1}
              />
            </Flex>
            <Flex align="center" gap="md">
              <IconUser stroke={1.5} />
              <Text style={{ width: "3rem" }}>Assign</Text>
              <TagsInput
                placeholder={
                  authContext?.isAdminLoggedIn
                    ? "Enter Assignee"
                    : "only admin can assign"
                }
                data={userNameList}
                filter={assigneeFilter}
                flex={1}
                {...form.getInputProps("assignee")}
                disabled={authContext?.isAdminLoggedIn ? false : true}
              />
            </Flex>
            <Textarea
              label="Description"
              {...form.getInputProps("description")}
            />
            <Button
              style={{ marginLeft: "auto" }}
              radius="xl"
              color="#1D2F6F"
              type="submit"
            >
              Create task
            </Button>
          </Flex>
        </form>
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
