import { Outlet } from 'react-router-dom';

import { Sidebar } from '../sidebar';

import './layout-main.scss';


export const LayoutMain = () => (
    <div className='layout-main'>
        <Sidebar />
        <div className='outlet'><Outlet /></div>
    </div>
);
