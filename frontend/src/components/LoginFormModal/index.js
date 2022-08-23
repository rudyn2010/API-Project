import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Log In:</h3>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
