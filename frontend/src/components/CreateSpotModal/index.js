import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import SpotForm from './SpotForm';
import "./CreateSpotModal.css"

function SpotFormModal() {

  const [showModal, setShowModal] = useState(false);

  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    setShowModal(false);
  }, [ spots ]);

  return (
    <>
      <div className='host-interactive' onClick={() => setShowModal(true)}>Become a Host</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotForm />
        </Modal>
      )}
    </>
  );
}

export default SpotFormModal;
