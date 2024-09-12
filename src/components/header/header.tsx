import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export const Header: FC = () => (
  <header className='header'>
    <nav className='navigation'>
      <div className='nav_part_left'>
        <>
          {/* <NavLink
            to='/advertisements'
            className={({ isActive }) =>
              `${link} ${isActive ? link_active : ''}`
            }
            end
          >
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink> */}
          <NavLink
            to='/advertisements'
            className={({ isActive }) =>
              `${'link'} ${isActive ? 'link_active' : ''}`
            }
            end
          >
            <p className='link__text'>Объявления</p>
          </NavLink>
        </>
        <>
          <NavLink
            to='/orders'
            className={({ isActive }) =>
              `${'link'} ${isActive ? 'link_active' : ''}`
            }
            end
          >
            <p className='link__text'>Заказы</p>
          </NavLink>
        </>
      </div>
      <div className='nav_part_right'>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `${'link'} ${isActive ? 'link_active' : ''}`
          }
          end
        >
          <p className='link__text'>{'UserName' || 'Личный кабинет'}</p>
        </NavLink>
      </div>
    </nav>
  </header>
);
