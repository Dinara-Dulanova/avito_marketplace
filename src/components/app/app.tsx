import { Header } from '../header';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Advertisements } from '../../pages/advertisements';
import { Orders } from '../../pages/orders';
import { Profile } from '../../pages/profile';
import { NotFound404 } from '../../pages/not-fount-404';
import { Advertisement } from '../../pages/advertisement';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={backgroundLocation || location}>
        <Route path='/advertisements' element={<Advertisements />} />
        <Route path='/advertisement/:id' element={<Advertisement />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<NotFound404 />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
