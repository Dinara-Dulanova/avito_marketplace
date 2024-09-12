import { Button } from '@mui/material';
import { FC } from 'react';
import './style.css';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel
}) => (
  <div className='confirmation-modal'>
    <div className='modal-content'>
      <div className='confirmation-buttons'>
        <Button variant='contained' onClick={onConfirm}>
          ДА!
        </Button>
        <Button variant='contained' onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </div>
  </div>
);
