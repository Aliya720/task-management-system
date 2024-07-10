import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";

const NewTask = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Task">
        <DateInput value={date} onChange={setDate} label="Date" />
        <TimeInput label="Time" />
        <Textarea label="Description" />
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
