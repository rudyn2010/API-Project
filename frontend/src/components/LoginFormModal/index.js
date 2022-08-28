import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import LoginForm from './LoginForm';
import "./LoginFormModal.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='login-interactive' onClick={() => setShowModal(true)}>Log In</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>LOG IN</div>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
