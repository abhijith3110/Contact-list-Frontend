import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createContact = createAsyncThunk("createContact", async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/contacts/api", data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
});

const initialState = {
  createContactData: {
    isLoading: false,
    data: [],
    isError: false,
  },
};

const contactSlice = createSlice({
  name: "createContacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createContact.pending, (state) => {
      state.createContactData.isLoading = true;
    });

    builder.addCase(createContact.fulfilled, (state, action) => {
      state.createContactData.isLoading = false;
      state.createContactData.data.push(action.payload);
      state.createContactData.isError = false;
    });

    builder.addCase(createContact.rejected, (state) => {
      state.createContactData.isLoading = false;
      state.createContactData.isError = true;
    });

  },
});

export default contactSlice.reducer;
