import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "@mantine/dates";

const MyCalendar = () => {
  const [selected, setSelected] = useState<Date[]>([new Date()]);

  const handleSelect = (date: Date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selected.length < 1) {
      setSelected((current) => [...current, date]);
    }
  };
  return (
    <Calendar
      defaultValue={dayjs(new Date()).format("YYYY-MM-DD")}
      getDayProps={(date) => ({
        selected: selected.some((s) => dayjs(date).isSame(s, "date")),
        onClick: () => handleSelect(date),
      })}
    />
  );
};

export default MyCalendar;
