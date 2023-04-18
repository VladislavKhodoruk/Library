import { Navigate, Outlet, useLocation } from 'react-router-dom';
import './require-auth.scss';

export const RequireAuth = () => {
    const location = useLocation();
    const auth = false;

    if (!auth) {
        return <Navigate to='/auth' state={{ from: location }} />
    }
    return < Outlet />
};
