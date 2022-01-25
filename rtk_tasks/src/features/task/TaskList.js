import React, { useEffect } from "react";
import styles from "./TaskList.module.css";
import { selectTasks, fetchAsyncGet } from "./taskSlice";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem.js";

import { fetchAsyncProf } from "../login/loginSlice";

const TaskList = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
      await dispatch(fetchAsyncProf());
    };
    fetchTaskProf();
  }, [dispatch]);
  return (
    <>
      <ul className={styles.TaskList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
