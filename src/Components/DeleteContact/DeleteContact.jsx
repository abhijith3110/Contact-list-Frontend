import React from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../Redux/Slice/contactSlice";
import { deleteContact } from "../../Redux/Slice/deleteContacts";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./DeleteContact.css";

const DeleteContact = ({ deleteID, deleteModal, setDeleteModal, searchTerm, page }) => {
  const dispatch = useDispatch();

  const customToastStyle = {
    color: 'red',
    background: 'black',
  };

  const handleDelete = async () => {
    await dispatch(deleteContact(deleteID));
    dispatch(fetchContacts({ searchTerm, page }));
    setDeleteModal(false);
    toast.error('Contact deleted successfully!', {
      style: customToastStyle,
    });
  };


  if (!deleteModal) {
    return null;
  }

  const closeHandleDelete = () => {
    setDeleteModal(false);
  };


  return (
    <div className="Delete-contact-div">
      <div className="delete-contact">
        <div className="delete-heading">
          <h1>Delete Contact</h1>
        </div>
        <div className="delete-contant">
          <h4>Are you sure you want to delete the contact?</h4>
          <div className="delete-btn">
            <button onClick={closeHandleDelete} className="no-btn">NO</button>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteContact;
