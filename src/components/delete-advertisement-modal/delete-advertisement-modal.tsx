// // delete-advertisement-modal
// import { TAdvertisment } from '@utils-types';
// import React, { useState } from 'react';
// import { useDispatch } from '../../services/store';
// import {
//   fetchDeleteAdvertisement,
//   postNewAdvertisement
// } from '../../services/slices/advertisements';

// interface AddAdvertisementModalProps {
//   onClose: () => void;

// }

// export const DeleteAdvertisementModal: React.FC<AddAdvertisementModalProps> = ({
//   onClose,

// }) => {
//   const [isSuccesfullyDeleted, setIsSuccesfullyDeleted] = useState(false);

//   const dispatch = useDispatch();

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     dispatch(fetchDeleteAdvertisement(advertisement));
//     setIsSuccesfullyDeleted(true);
//     setTimeout(() => {
//       onClose();
//       setIsSuccesfullyDeleted(false);
//     }, 5000);
//   };
//   return (
//     <>
//       {!isSuccesfullyDeleted && (
//         <>
//           <button type='submit'>Добавить</button>
//         </>
//       )}

//       {isSuccesfullyDeleted && (
//         <div className='modal-succesfully-added'>
//           <p></p>
//         </div>
//       )}
//     </>
//   );
// };
