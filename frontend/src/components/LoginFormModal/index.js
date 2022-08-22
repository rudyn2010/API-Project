import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Log in or sign up</h3>
          <h2>Welcome to OxygenBnB</h2>
          <SignupFormPage />
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
