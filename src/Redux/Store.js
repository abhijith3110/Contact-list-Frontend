import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./Slice/contactSlice";
import createContactReducer from "./Slice/createContacts";
import deleteContactReducer from "./Slice/deleteContacts";
import updateContactReducer from "./Slice/updateContacts";
export default configureStore({
  reducer: {
    contacts: contactReducer,
    createContacts: createContactReducer,
    deleteContacts: deleteContactReducer,
    updateContacts: updateContactReducer,
  },
});
