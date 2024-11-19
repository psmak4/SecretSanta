import { Route, Routes } from 'react-router-dom'
import AppRoutes from '../constants/AppRoutes'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Layout from './Layout'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={AppRoutes.Home()} element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={AppRoutes.Login()} element={<Login />} />
				<Route path={AppRoutes.Register()} element={<Register />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
