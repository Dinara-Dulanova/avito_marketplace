import './modal-overlay.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div className='modal__overlay' onClick={onClick} />
);
