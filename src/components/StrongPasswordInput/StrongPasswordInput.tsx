import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  rem,
  Group,
} from "@mantine/core";
import { regex } from "../../constants/regex";
import { CustomInputProps } from "./customInputProps.types";

const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <span style={{ marginLeft: 10 }}>{label}</span>
    </Text>
  );
};

const requirements = [
  { re: regex.Number, label: "Includes number" },
  { re: regex.LowerCase, label: "Includes lowercase letter" },
  { re: regex.UpperCase, label: "Includes uppercase letter" },
  { re: regex.SpecialChar, label: "Includes special symbol" },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const StrongPasswordInput = ({ value, onChange }: CustomInputProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const inputValue = value as string;

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(inputValue)}
    />
  ));

  const strength = getStrength(inputValue);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <Group
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            label="password"
            placeholder="password"
            value={inputValue}
            onChange={onChange}
            flex={1}
          />
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={inputValue.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};

export default StrongPasswordInput;
