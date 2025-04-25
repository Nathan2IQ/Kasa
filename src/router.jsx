import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import APropos from './pages/A-Propos/APropos.jsx';
import Logement from './pages/Logement/Logements.jsx';
import NotFound from './pages/404-Page/404-page.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/a-propos', element: <APropos /> },
  { path: '/logement/:id', element: <Logement /> },
  { path: '*', element: <NotFound /> },
]);

export default router;