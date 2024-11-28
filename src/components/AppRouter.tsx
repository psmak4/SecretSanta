import { Route, Routes } from 'react-router'
import EditExchange from '../pages/EditExchange'
import EditWishlist from '../pages/EditWishlist'
import ExchangeDetails from '../pages/ExchangeDetails'
import Exchanges from '../pages/Exchanges'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NewExchange from '../pages/NewExchange'
import NewWishlist from '../pages/NewWishlist'
import Register from '../pages/Register'
import WishlistDetails from '../pages/WishlistDetails'
import Wishlists from '../pages/Wishlists'
import FormLayout from './FormLayout'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />

				<Route element={<PublicRoute />}>
					<Route element={<FormLayout />}>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
					</Route>
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route path='exchanges'>
						<Route index element={<Exchanges />} />
						<Route element={<FormLayout />}>
							<Route path='new' element={<NewExchange />} />
							<Route path=':id/edit' element={<EditExchange />} />
						</Route>
						<Route path=':id' element={<ExchangeDetails />} />
					</Route>

					<Route path='wishlists'>
						<Route index element={<Wishlists />} />
						<Route element={<FormLayout />}>
							<Route path='new' element={<NewWishlist />} />
							<Route path=':id/edit' element={<EditWishlist />} />
						</Route>
						<Route path=':id' element={<WishlistDetails />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}

export default AppRouter
