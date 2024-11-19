import { Navbar } from 'flowbite-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AppRoutes from '../constants/AppRoutes'

const Header = () => {
	const { pathname } = useLocation()

	return (
		<Navbar className='shadow-md sticky top-0'>
			<Navbar.Brand as={Link} to={AppRoutes.Home()}>
				<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Secret Santa</span>
			</Navbar.Brand>
			<Navbar.Toggle className='ml-2' />
			<Navbar.Collapse>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Home()} active={pathname === AppRoutes.Home()}>
					Home
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Login()} active={pathname === AppRoutes.Login()}>
					Login
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Register()} active={pathname === AppRoutes.Register()}>
					Register
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header
