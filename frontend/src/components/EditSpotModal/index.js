import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditForm';
import "./EditSpotModal.css"


function EditSpotModal() {

  const [showModal, setShowModal] = useState(false);

  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    setShowModal(false);
  }, [ spots ]);

  return (
    <>
      <div className='edit-button' onClick={() => setShowModal(true)}>Edit Spot</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
