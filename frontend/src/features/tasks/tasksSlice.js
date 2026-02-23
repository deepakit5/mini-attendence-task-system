import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchTasks = createAsyncThunk("tasks/fetch", async (params = {}, { rejectWithValue }) => {
  try {
    const res = await api.get("/tasks", { params });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createTask = createAsyncThunk("tasks/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/tasks", payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateTask = createAsyncThunk("tasks/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/tasks/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const slice = createSlice({
  name: "tasks",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => { state.list = action.payload; state.status = "succeeded"; })
      .addCase(fetchTasks.pending, state => { state.status = "loading"; state.error = null; })
      .addCase(fetchTasks.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(createTask.fulfilled, (state, action) => { state.list.unshift(action.payload); });
  }
});

export default slice.reducer;