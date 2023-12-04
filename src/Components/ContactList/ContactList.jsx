import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../Redux/Slice/contactSlice";
import AddContact from "../AddContact/AddContact";
import UpdateContact from "../UpdateContact/UpdateContact";
import DeleteContact from "../DeleteContact/DeleteContact";
import Overlay from "../Overlay/Overlay";
import "./ContactList.css";


const ContactList = () => {
  const dispatch = useDispatch();
  const { data,totalPages,page } = useSelector((state) => state.contacts);
  const [isAddContactVisible, setAddContactVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState([]);
  const [isUpdateContactVisible, setUpdateContactVisible] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    dispatch(fetchContacts({ page, searchTerm }));
  }, [dispatch, page,searchTerm]);
  console.log(data);
  

  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setOverlay(true);
    setDeleteID(id);
  };

  const handleUpdateContactClick = () => {
    setUpdateContactVisible(true);
    setOverlay(true);
  };

  const handleUpdate = (contactId) => {
    handleUpdateContactClick();
    const contactToUpdate = data.find((contact) => contact.id_contact_list === contactId);
    setSelectedContact(contactToUpdate);
  };

  const handleAddContactClick = () => {
    setAddContactVisible(true);
    setOverlay(true);
  };

  const handleCloseAddContactForm = () => {
    setAddContactVisible(false);
    setOverlay(false);
  };

  const handleCloseUpdateContactForm = () => {
    setUpdateContactVisible(false);
    setOverlay(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleChangePage = (newPage) => {
    if (newPage !== page) {
      dispatch(fetchContacts({ page: newPage, searchTerm }));
    }
  };
  
  const pageNumbers = Array.from({length: totalPages }, (_, index) => index + 1);


  return (
    <div className="contact-table">
      <div className="search-add-div">
        <div className="search-bar">
          <input type="text" placeholder="Search contacts" value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="addContact-btn-div">
          <button className="addContact-btn" onClick={handleAddContactClick}>
            <i>Add contacts</i>
          </button>
        </div>
      </div>
      {data.length === 0 && <h1 className="no-data-search">No contacts found</h1>}
      {data.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>SI.NO</th>
                <th>NAME</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {contact.first_name} {contact.last_name}
                  </td>
                  <td>{contact.email}</td>
                  <td>{contact.phn_number}</td>
                  <td>
                    <button onClick={() => handleUpdate(contact.id_contact_list)} className="contact-edit-btn">
                      <span className="material-symbols-outlined">
                        edit_square
                      </span>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteModal(contact.id_contact_list)} className="contact-del-btn">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

{/* paginations */}

        <div className="pagination">
        <button className="paginate_btn" onClick={() => handleChangePage(page - 1)} disabled={page===1}>
          Previous
        </button>
          {pageNumbers.map((pageNumber) => (
            <button id="buttonNumber" key={pageNumber} onClick={() => handleChangePage(pageNumber)} className={`${pageNumber === page ? "active" : ""}`}>
              {pageNumber}
            </button>
          ))}
        <button className="paginate_btn"onClick={() => handleChangePage(page + 1)}disabled={page>=totalPages}>
          Next
        </button>
        </div>
        
{/* CRUD COMPONENTS */}

          {deleteModal && overlay && <Overlay />}
          <div className="delete-contact-component">
            {deleteModal && overlay && (
              <DeleteContact deleteID={deleteID} deleteModal={deleteModal} setDeleteModal={setDeleteModal} searchTerm={searchTerm} page={page}/>
            )}
          </div>

          {isAddContactVisible && overlay && <Overlay />}
          <div className="addform-component">
            {isAddContactVisible && overlay && (
              <AddContact onCloseForm={handleCloseAddContactForm} searchTerm={searchTerm} page={page}/>
            )}
          </div>

          {isUpdateContactVisible && selectedContact && overlay && <Overlay />}
          <div className="edit-conatact-form">
            {selectedContact && isUpdateContactVisible && overlay && (
              <UpdateContact selectedContact={selectedContact} onCloseForm={handleCloseUpdateContactForm} searchTerm={searchTerm} page={page} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ContactList;


