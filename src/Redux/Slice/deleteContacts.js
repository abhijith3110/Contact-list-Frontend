import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  conatactData: [],
  isError: false,
  errorMessage: ""
}

export const deleteContact = createAsyncThunk("deleteContact", async (contactId) => {
  try {
    await axios.delete(`http://localhost:5000/contacts/api/${contactId}`);
    return contactId;
  } catch (error) {
    console.error("Error deleting contact", error);
    throw error;
  }
});

const contactSlice = createSlice({
  name: "deleteContacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.conatactData = state.conatactData.filter((contact) => contact.id_contact_list !== action.payload);
      state.isError = false;
    });

    builder.addCase(deleteContact.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  },
});

export default contactSlice.reducer;
