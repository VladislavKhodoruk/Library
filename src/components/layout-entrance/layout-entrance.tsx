import { Outlet } from 'react-router-dom';
import './layout-entrance.scss';


export const LayoutEntrance = () => (
    <div className='layout-entrance'>
        <h1 className='layout-entrance-header'>Cleverland</h1>
        <div className='layout-entrance-outlet'><Outlet /></div>
    </div>
);
