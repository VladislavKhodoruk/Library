import { Outlet } from 'react-router-dom';
import { defaultUser } from '../../mockdata';
import { Footer } from '../footer';
import { Header } from '../header';
import './layout.scss';

export const Layout = () => (
    <div className='layout'>
        <Header username={defaultUser.username} imgLink={defaultUser.imgLink} />
        <Outlet />
        <Footer />
    </div>
);
