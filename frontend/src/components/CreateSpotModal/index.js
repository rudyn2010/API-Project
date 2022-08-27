import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import SpotForm from './SpotForm';


function SpotFormModal() {

  const [showModal, setShowModal] = useState(false);

  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    setShowModal(false);
  }, [ spots ]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Become a Host</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotForm />
        </Modal>
      )}
    </>
  );
}

export default SpotFormModal;
