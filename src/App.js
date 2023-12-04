import Header from "./Components/Header/Header";
import ContactList from "./Components/ContactList/ContactList";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "./Redux/Slice/contactSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <ContactList />
      <ToastContainer />
    </div>
  );
}

export default App;
