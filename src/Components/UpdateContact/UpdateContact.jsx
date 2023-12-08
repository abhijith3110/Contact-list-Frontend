import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContacts } from "../../Redux/Slice/updateContacts";
import { fetchContacts } from "../../Redux/Slice/contactSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UpdateContact.css";

const UpdateContact = ({ selectedContact, onCloseForm, searchTerm, page }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phn_number: '' });

  useEffect(() => {
    if (selectedContact) {
      setFormData({
        first_name: selectedContact.first_name,
        last_name: selectedContact.last_name,
        email: selectedContact.email,
        phn_number: selectedContact.phn_number,
      });
    }
  }, [selectedContact]);


  const handleChangeData = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value, }));
  };

  const customToastStyle = {
    color: 'white',
    background: 'Purple',
  };


  const handleSubmit = async () => {
    if (selectedContact) {
      await dispatch(updateContacts({ contactID: selectedContact.id_contact_list, updatedData: formData }));
      await dispatch(fetchContacts({ searchTerm, page }));
      onCloseForm();
      toast.success('Contact Updated successfully!', {
        style: customToastStyle,
      });
    }
  };

  const closeForm = () => {
    onCloseForm();
  };


  return (
    <div className='edit-contact-form'>
      <div className='form-header'>
        <div className='form-heading'>
          <label><h2>EDIT CONTACT FORM</h2></label>
        </div>
        <div>
          <span className="material-symbols-outlined" onClick={closeForm}>
            cancel
          </span>
        </div>
      </div>
      <form>
        <label> First Name:<input type="text" id="first_name" value={formData.first_name} onChange={handleChangeData} /></label>
        <label> Last Name: <input type="text" id="last_name" value={formData.last_name} onChange={handleChangeData} /></label>
        <label> Email: <input type="text" id="email" value={formData.email} onChange={handleChangeData} /></label>
        <label>Phone Number:<input type="text" id="phn_number" value={formData.phn_number} onChange={handleChangeData} /></label>
        <div className='edit-form-btn'>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;
