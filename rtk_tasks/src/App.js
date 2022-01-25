import React from "react";
import styles from "./App.module.css";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "@material-ui/core";
import TaskList from "./features/task/TaskList";
import TaskDetails from "./features/task/TaskDetails";
import TaskInput from "./features/task/TaskInput";

function App() {
  const logout = () => {
    localStorage.removeItem("localJWT");
    window.location.href = "/";
  };
  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <Button onClick={logout} className={styles.signBtn}>
          <FaSignInAlt />
        </Button>
        <TaskInput />
        <TaskList />
      </div>
      <div className={styles.appDetails}>
        <TaskDetails />
      </div>
    </div>
  );
}

export default App;
