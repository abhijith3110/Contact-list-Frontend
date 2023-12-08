import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updateContacts = createAsyncThunk("updateContacts", async ({ contactID, updatedData }) => {
    try {
        const response = await axios.put(`http://localhost:5000/contacts/api/${contactID}`, updatedData);
        return response.data
    } catch (error) {
        console.log("error : updating contact", error);
        throw error;
    }
});


const initialState = {
    isLoading: false,
    conatactData: [],
    isError: false,
};


const contactSlice = createSlice({
    name: "updateContacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateContacts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(updateContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.conatactData = state.conatactData.map((contact) =>
                contact.id_contact_list === action.payload.id_contact_list ? action.payload : contact
            );
            state.isError = false;
        });

        builder.addCase(updateContacts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});


export default contactSlice.reducer;