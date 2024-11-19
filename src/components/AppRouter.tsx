import { Route, Routes } from 'react-router-dom'
import AppRoutes from '../constants/AppRoutes'
import Exchanges from '../pages/Exchanges'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Wishlists from '../pages/Wishlists'
import Layout from './Layout'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={AppRoutes.Home()} element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={AppRoutes.Exchanges()} element={<Exchanges />} />
				<Route path={AppRoutes.Login()} element={<Login />} />
				<Route path={AppRoutes.Register()} element={<Register />} />
				<Route path={AppRoutes.Wishlists()} element={<Wishlists />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
