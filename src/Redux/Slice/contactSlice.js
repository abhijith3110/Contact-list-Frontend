import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  conatactData: [],
  isError: false,
  errorMessage: "",
  page: 1,
  total: 0,
  totalPages: 0,
  searchTerm: "",
};

export const fetchContacts = createAsyncThunk("fetchContact", async ({ page, limit, searchTerm }) => {
  try {
    const response = await axios.get(`http://localhost:5000/contacts/api?page=${page}&limit=${limit}&searchTerm=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.conatactData = action.payload.conatactData;
      state.totalPages = action.payload.totalPages;
      state.total = action.payload.total;
      state.isError = false;
    });

    builder.addCase(fetchContacts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default contactSlice.reducer;
