import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

import "./SignupFormModal.css"


function SignupFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='signup-interactive' onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <h3>Sign Up:</h3>
            <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
