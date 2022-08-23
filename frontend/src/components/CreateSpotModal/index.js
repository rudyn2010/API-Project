import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SpotForm from './SpotForm';


function SpotFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>New Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotForm />
        </Modal>
      )}
    </>
  );
}

export default SpotFormModal;
