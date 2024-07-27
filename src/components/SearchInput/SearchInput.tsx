import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const SearchInput = () => {
  const authContext = useAuthContext();
  const [search, setSearch] = useState("");

  const searchByName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
    const filterTasks =
      search.length > 1
        ? authContext?.taskList?.filter((task) => {
            return search.toLowerCase() === ""
              ? task
              : task.name.toLowerCase().includes(search);
          })
        : authContext?.taskList;
    console.log(filterTasks);
  };

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(e) => searchByName(e)}
        rightSection={<IconSearch size="1rem" stroke={1.5} />}
        visibleFrom="sm"
        style={{ width: "30rem" }}
        radius="xl"
      />
    </>
  );
};

export default SearchInput;
