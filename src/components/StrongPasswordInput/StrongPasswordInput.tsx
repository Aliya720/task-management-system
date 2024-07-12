import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  rem,
} from "@mantine/core";
import { regex } from "../../constants/regex";

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
      <Box ml={10}>{label}</Box>
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

const StrongPasswordInput = (props: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  // const [value, setValue] = useState("");

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(props.value)}
    />
  ));

  const strength = getStrength(props.value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            label="password"
            placeholder="password"
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={props.value.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
};

export default StrongPasswordInput;
