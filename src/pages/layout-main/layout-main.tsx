import './layout-main.scss';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar';


export const LayoutMain = (props: { store: any }) => (
    <div className='layout-main'>
        <Sidebar store={props.store} />
        <div className='outlet'><Outlet /></div>
    </div>
);
