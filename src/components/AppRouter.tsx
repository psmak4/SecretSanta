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
import Layout from './Layout'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='exchanges'>
					<Route index element={<Exchanges />} />
					<Route path='new' element={<NewExchange />} />
					<Route path=':id/edit' element={<EditExchange />} />
					<Route path=':id' element={<ExchangeDetails />} />
				</Route>
				<Route path='wishlists'>
					<Route index element={<Wishlists />} />
					<Route path='new' element={<NewWishlist />} />
					<Route path=':id/edit' element={<EditWishlist />} />
					<Route path=':id' element={<WishlistDetails />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default AppRouter
