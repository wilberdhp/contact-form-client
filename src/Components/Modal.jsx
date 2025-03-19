import './ModalStyles.css';

export const Modal = ({ children, openModal, closeModal, warningModal }) => {

  const handleCLick = (e) => {
    closeModal(e)
  }

  const className = warningModal ? "modal-container warning-modal" : "modal-container";

  return (
    <dialog open={openModal ? true : false}>
      <div className={className}>   
        {children}
        <button className='btn-close-modal' onClick={handleCLick} type="button">
          {warningModal ? "Continue" : "Close"}
        </button>
      </div>
    </dialog>
  )
}