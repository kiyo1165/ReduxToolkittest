import React from "react";
import styles from "./TaskInput.module.css";
import {
  fetchAsyncCreate,
  fetchAsyncUpdate,
  editTask,
  selectEditedTask,
} from "./taskSlice";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const TaskInput = () => {
  const dispatch = useDispatch(fetchAsyncCreate);
  const editedTask = useSelector(selectEditedTask);

  const handoleInputChange = (e) => {
    editedTask.id === 0
      ? dispatch(editTask({ id: 0, title: e.target.value }))
      : dispatch(editTask({ id: editedTask.id, title: e.target.value }));
  };
  const isDisabled = editedTask.title.length === 0;

  const createClicked = () => {
    dispatch(fetchAsyncCreate(editedTask));
    dispatch({ id: 0, title: "" });
  };

  const updateClicked = () => {
    dispatch(fetchAsyncUpdate(editedTask));
    dispatch({ id: 0, title: "" });
  };
  return (
    <div>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.title}
        onChange={handoleInputChange}
        placeholder="入力してください。"
      />
      <div className={styles.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
