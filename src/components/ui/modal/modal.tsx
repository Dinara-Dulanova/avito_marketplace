import { FC, memo, ReactNode } from 'react';

import './modal.css';
import { ModalOverlayUI } from '../modal-overlay';

export type TModalUIProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className='modal'>
        <div className='modal__header'>
          <h3 className='modal__title'>{title}</h3>
          <button className='close__button' type='button' onClick={onClose}>
            Х
          </button>
        </div>
        <div className='modal__content'>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
