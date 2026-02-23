import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// register
export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register", payload);
    return res.data; // { id, name, email }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// login
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data; // {id, name, email, role}
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  return null;
});

const slice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    setUser(state, action) { state.user = action.payload; }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.status = "succeeded"; /* registration returns basic user - user still must login */ })
      .addCase(register.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })

      .addCase(login.pending, state => { state.status = "loading"; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.status = "succeeded"; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })

      .addCase(logout.fulfilled, state => { state.user = null; state.status = "idle"; });
  }
});

export const { setUser } = slice.actions;
export default slice.reducer;