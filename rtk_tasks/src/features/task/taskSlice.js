import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api/tasks/";
const token = localStorage.localJWT;

export const fetchAsyncGet = createAsyncThunk("tasks/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk("tasks/post", async (task) => {
  const res = await axios.post(apiUrl, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncUpdate = createAsyncThunk("tasks/put", async (task) => {
  const res = await axios.put(`${apiUrl}${task.id}/`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncDelete = createAsyncThunk("tasks/delete", async (id) => {
  const res = await axios.delete(`${apiUrl}${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return id;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
      },
    ],
    editedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
    selectedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
  },
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTask: action.payload,
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        selectedTask: { id: 0, titile: "", created_at: "", updated_at: "" },
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

//状態をコンポーネントで使用するためのエキスポート
export const selectSelectedTask = (state) => state.task.selectedTask;
export const selectEditedTask = (state) => state.task.editedTask;
export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
