import React from 'react';

interface AddAdvertisementButtonProps {
  onClick: () => void;
}

export const AddAdvertisementButton: React.FC<AddAdvertisementButtonProps> = ({
  onClick
}) => {
  console.log('AddAdvertisementButton');
  return <button onClick={onClick}>Разместить объявления</button>;
};
