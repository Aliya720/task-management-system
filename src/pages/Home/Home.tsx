import { useState } from "react";
import { app } from "../../firebaseConfig";
import { getDatabase, push, ref, set } from "firebase/database";

const Home = () => {
  const [task, setTask] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const dataRef = push(ref(db, "user/task"));
    set(dataRef, { TodayTask: task });
  };

  return (
    <>
      <label>Add task</label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={saveData}>save</button>
    </>
  );
};

export default Home;
