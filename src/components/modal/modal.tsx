import { FC, memo, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ModalUI } from '../ui/modal';

const modalRoot = document.getElementById('modals');

export type TModalProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
