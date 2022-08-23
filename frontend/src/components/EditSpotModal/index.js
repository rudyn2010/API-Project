import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';



function EditSpotModal() {

  const [showModal, setShowModal] = useState(false);

//   const spots = useSelector((state) => state.spots);

//   useEffect(() => {
//     setShowModal(false);
//   }, [ spots ]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
