import { memo, useState } from 'react';
import './style.css';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  onItemsPerPageChange
}) => {
  const [itemsPerPageInput, setItemsPerPageInput] = useState(itemsPerPage);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    console.log(value);
    setItemsPerPageInput(value);

    onItemsPerPageChange(value);
  };

  let pageNumbers: (number | string)[] = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 2) {
    pageNumbers = [1, 2, 3, '...', totalPages];
  } else if (currentPage === 3) {
    pageNumbers = [1, 2, 3, 4, '...', totalPages];
  } else if (currentPage < totalPages - 2) {
    pageNumbers = [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  } else if (currentPage === totalPages - 2) {
    pageNumbers = [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      totalPages
    ];
  } else {
    pageNumbers = [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return (
    <>
      <div className='pagination-container'>
        <div className='items-per-page'>
          <label htmlFor='itemsPerPage'>Items per page:</label>
          <input
            type='number'
            id='itemsPerPage'
            max={totalItems}
            value={itemsPerPageInput}
            onChange={handleItemsPerPageChange}
          />
        </div>
        {!itemsPerPageInput ? null : (
          <ul className='pagination'>
            {pageNumbers.map((number) =>
              number !== '...' ? (
                <li
                  className={`page-item ${number === currentPage ? 'currentPage' : ''}`}
                  key={number}
                >
                  <p
                    className='page-link'
                    onClick={() => paginate(number as number)}
                  >
                    {' '}
                    {number}
                  </p>
                </li>
              ) : (
                <p key={number} className='page-item dots'>
                  ...
                </p>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default memo(Pagination);
