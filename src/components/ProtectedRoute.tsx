import { Navigate, Outlet, useLocation } from 'react-router'
import AppRoutes from '../constants/AppRoutes'
import useAuthStore from '../hooks/useAuthStore'

const ProtectedRoute = () => {
	const { user } = useAuthStore()
	const location = useLocation()

	if (!user) return <Navigate to={AppRoutes.Login()} state={{ from: location }} />

	return <Outlet />
}

export default ProtectedRoute
