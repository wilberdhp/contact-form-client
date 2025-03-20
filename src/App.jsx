import './App.css'
import { useEffect, useState } from 'react'
import { LabelInput } from './Components/LabelInput.jsx'
import { Modal } from './Components/Modal.jsx';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [messageValidation, setMessageValidation] = useState(false);
  const [disabledBtnSendEmail, setDisabledBtnSendEmail] = useState(false);

  // Modal
  const [openModalMail, setOpenModalMail] = useState(false);
  const [infoMail, setInfoMail] = useState("");
  const [statusMail, setStatusMail] = useState("");

  // Warning Modal
  const [openWarningModal, setOpenWarningModal] = useState(true);


  useEffect(() => {

    if (name.length > 3) {
      setNameValidation(true);
    }

    if (email.includes("@") && email.length > 7) {
      setEmailValidation(true);
    }

    if (message.length > 10) {
      setMessageValidation(true);
    }

    return () => {
      setNameValidation(false);
      setEmailValidation(false);
      setMessageValidation(false);
    }

  }, [name, email, message])

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabledBtnSendEmail(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: name, email: email, message: message })
      })

      const data = await res.json();

      setOpenModalMail(true);
      setInfoMail(data.message)
      setStatusMail(res.ok ? "Success" : "Error");
      

      } catch {
        setOpenModalMail(true);
        setStatusMail("Connection error");
    }
  }

  const closeModal = () => {
    if (openWarningModal) return setOpenWarningModal(false);
    
    if (openModalMail) {

      if (statusMail === "Success") {
        clearForm();
      }

      setDisabledBtnSendEmail(false);
      setOpenModalMail(false);
      return;
    }
  }

  return (
    <>
      <Modal openModal={openWarningModal} warningModal closeModal={closeModal}>
        <h1 className='title-modal warning'>WARNING</h1>
        <div className='warning-info'>
        <p>This website is a demo of a functional email contact form.</p>
        <p>The form will send an email to "exampleemail5054@gmail.com".</p>
        <p><strong>Please do not enter personal data or sensitive information.</strong></p>
        </div>
      </Modal>
      
      <h1>Contact Me</h1>
      <span className='span-sending-email'>{disabledBtnSendEmail ? "Sending..." : ""}</span>
      <form onSubmit={handleSubmit}>

        <LabelInput 
          labelClassName={nameValidation ? "completed" : "incomplete"}
          text 
          id='input-name' 
          name='name' 
          placeholder='Name' 
          value={name} 
          eventChange={(e) => setName(e.target.value)} 
          children={nameValidation ? "Completed field" : "Incomplete field (text longer than 3 letters)"}
        />

        <LabelInput 
          labelClassName={emailValidation ? "completed" : "incomplete"}
          email 
          id='input-email' 
          value={email} 
          name='email' 
          placeholder='Email'
          eventChange={(e) => setEmail(e.target.value)}
          children={emailValidation ? "Completed field" : "Incomplete field (text longer than 7 letters and add @)"}
        />

        <label className={messageValidation ? "completed" : "incomplete"}>
          <textarea 
            id='textarea-message' 
            name='message' 
            placeholder='Message'
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {
            messageValidation ? 
              "Completed field" : 
              "Incomplete field (text longer than 10 letters)"
          }
        </label>
        <button 
          type='submit' 
          disabled={!nameValidation || !emailValidation || !messageValidation || disabledBtnSendEmail} 
        >
          Submit
        </button>
      </form>

      <Modal openModal={openModalMail} closeModal={closeModal}>
        <h1 className='title-modal'>{statusMail}</h1>
        <p>{infoMail}</p>
      </Modal>
    </>
  )
}

export default App
