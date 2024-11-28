import { Location, Navigate, Outlet, useLocation } from 'react-router'
import AppRoutes from '../constants/AppRoutes'
import useAuthStore from '../hooks/useAuthStore'

const PublicRoute = () => {
	const { user } = useAuthStore()
	const location = useLocation()

	const getRedirectUrl = ({ state }: Location<any>) => {
		if (state && state.from && state.from.pathname) return state.from.pathname

		return AppRoutes.Home()
	}

	if (user) return <Navigate to={getRedirectUrl(location)} />

	return <Outlet />
}

export default PublicRoute
