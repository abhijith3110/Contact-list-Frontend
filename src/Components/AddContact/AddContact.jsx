import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../../Redux/Slice/createContacts';
import { fetchContacts } from "../../Redux/Slice/contactSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddContact.css";

const AddContact = ({ onCloseForm, searchTerm, page }) => {
    const dispatch = useDispatch();

    const customToastStyle = {
        color: 'white',
        background: 'green',
    };

    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phn_number: '' });
    const [errors, setErrors] = useState({});

    const handleChangeData = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value, });
        setErrors({ ...errors, [e.target.id]: '', });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.first_name) {
            newErrors.first_name = 'First Name is required';
            valid = false;
        }

        if (!formData.last_name) {
            newErrors.last_name = 'Last Name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (!formData.phn_number) {
            newErrors.phn_number = 'Phone Number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(formData.phn_number.trim())) {
            newErrors.phn_number = 'Invalid phone number format';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            await dispatch(createContact(formData));
            dispatch(fetchContacts({ searchTerm, page }));
            setFormData({ first_name: '', last_name: '', email: '', phn_number: '', });
            toast.success('Contact Created successfully!', {
                style: customToastStyle,
            });
            onCloseForm();
        }

    };

    const closeForm = () => {
        onCloseForm();
    };


    return (
        <div className='add-contact-form'>
            <form className='add-form-contact'>
                <div className='form-header'>
                    <div className='form-heading'>
                        <label><h2>ADD CONTACT FORM</h2></label>
                    </div>
                    <div> <span class="material-symbols-outlined" onClick={closeForm}>
                        cancel
                    </span>
                    </div>
                </div>

                <div className='add-form-table'>
                    <label>First Name:<input type="text" id="first_name" value={formData.first_name} onChange={handleChangeData} />
                        {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                    </label>
                    <label>Last Name:<input type="text" id="last_name" value={formData.last_name} onChange={handleChangeData} />
                        {errors.last_name && <span className="error-message">{errors.last_name}</span>}
                    </label>
                    <label>Email:<input type="text" id="email" value={formData.email} onChange={handleChangeData} />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </label>
                    <label>Phone Number:<input type="text" id="phn_number" value={formData.phn_number} onChange={handleChangeData} />
                        {errors.phn_number && <span className="error-message">{errors.phn_number}</span>}
                    </label>
                </div>
                <div className='add-form-btn'>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddContact;
