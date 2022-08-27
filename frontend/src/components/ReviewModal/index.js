import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';

import "./ReviewModal.css"


function ReviewFormModal() {

  const [showModal, setShowModal] = useState(false);

  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    setShowModal(false);
  }, [ reviews ]);

  return (
    <>
      <button className='review-button' onClick={() => setShowModal(true)}>Leave a Review!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm />
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
