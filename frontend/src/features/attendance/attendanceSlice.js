import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const markAttendance = createAsyncThunk("attendance/mark", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/attendance", payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchMyAttendance = createAsyncThunk("attendance/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/attendance/me");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const slice = createSlice({
  name: "attendance",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(markAttendance.fulfilled, (state, action) => { state.list.unshift(action.payload); })
      .addCase(fetchMyAttendance.fulfilled, (state, action) => { state.list = action.payload; });
  }
});

export default slice.reducer;