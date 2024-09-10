import { FC } from 'react';
import { NavLink } from 'react-router-dom';
// import { AppHeaderUI } from '@ui';

export const Header: FC = () => (
  <header className='header'>
    <nav className={`navigation`}>
      <div className={'menu_part_left'}>
        <>
          <NavLink to='/advertisements'>
            <p className='text text_type_main-default ml-2 mr-10'>
              Объявленияы
            </p>
          </NavLink>
        </>
        <>
          <NavLink to='/orders'>
            <p className='text text_type_main-default ml-2'>Заказы</p>
          </NavLink>
        </>
      </div>
      {/* <div className={styles.logo}>
      <Logo className='' />
    </div> */}
      <div className={'link_position_last'}>
        {/* <ProfileIcon type={'primary'} /> */}
        <NavLink to='/profile'>
          <p className='text text_type_main-default ml-2'>
            {'userName' || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);

// export const Header: FC = () =>
//       <header className='header'>
//         <nav className={`navigation`}>
//           <div className={'menu_part_left'}>
//             <>
//               <NavLink to='/'>
//                 <p className='text text_type_main-default ml-2 mr-10'>
//                   Конструктор
//                 </p>
//               </NavLink>
//             </>
//             <>
//               <NavLink to='/feed'>
//                 <p className='text text_type_main-default ml-2'>
//                   Лента заказов
//                 </p>
//               </NavLink>
//             </>
//           </div>
//           {/* <div className={styles.logo}>
//       <Logo className='' />
//     </div> */}
//           <div className={'link_position_last'}>
//             {/* <ProfileIcon type={'primary'} /> */}
//             <NavLink to='/profile'>
//               <p className='text text_type_main-default ml-2'>
//                 {'userName' || 'Личный кабинет'}
//               </p>
//             </NavLink>
//           </div>
//         </nav>
//       </header>
//   );
//   console.log('Header render');
//   return <div>Header</div>;
//   return <AppHeaderUI userName='USER' />;  //предполагается заполнять данными юзера с бека
