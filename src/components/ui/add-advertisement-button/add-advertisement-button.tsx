import React from 'react';
import { Button } from '@mui/material';

interface AddAdvertisementButtonProps {
  onClick: () => void;
}

export const AddAdvertisementButton: React.FC<AddAdvertisementButtonProps> = ({
  onClick
}) => (
  <Button
    className='add-advertisement-button'
    onClick={onClick}
    variant='contained'
  >
    Разместить объявления
  </Button>
);
{
  /* <button className='add-advertisement-button' onClick={onClick}>Разместить объявления</button>; */
}
