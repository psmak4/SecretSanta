import { User, signOut } from 'firebase/auth'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AppRoutes from '../constants/AppRoutes'
import useAuthStore from '../hooks/useAuthStore'
import { auth } from '../lib/Firebase'
import Encryption from '../utils/Encryption'

type NavProps = {
	pathname: string
	user?: User
}

const AuthenticatedNav = ({ pathname, user }: NavProps) => {
	const [gravatarUrl, setGravatarUrl] = useState<string>('')

	const handleLogoutClick = () => {
		signOut(auth).catch((error) => {
			console.log('An error occurred while logging out the current user:', error)
		})
	}

	useEffect(() => {
		let isAlive = true

		const getGravatarUrl = async () => {
			const hashedEmail = await Encryption.sha256(user?.email!)
			const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}?s=40`

			return gravatarUrl
		}

		getGravatarUrl().then((url: string) => {
			if (isAlive) setGravatarUrl(url)
		})

		return () => {
			isAlive = false
		}
	}, [])

	return (
		<>
			<div className='flex md:order-2 gap-2'>
				{gravatarUrl && (
					<Dropdown arrowIcon={false} inline label={<Avatar alt='User settings' img={gravatarUrl} rounded />}>
						<Dropdown.Header>
							{user?.displayName && <span className='block text-sm'>{user.displayName}</span>}
							<span className='block truncate text-sm font-medium'>{user?.email}</span>
						</Dropdown.Header>
						<Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
					</Dropdown>
				)}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Home()} active={pathname === AppRoutes.Home()}>
					Home
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Exchanges()} active={pathname === AppRoutes.Exchanges()}>
					Exchanges
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Wishlists()} active={pathname === AppRoutes.Wishlists()}>
					Wishlists
				</Navbar.Link>
			</Navbar.Collapse>
		</>
	)
}

const UnauthenticatedNav = ({ pathname }: NavProps) => {
	return (
		<>
			<div className='flex md:order-2 gap-2'>
				<Navbar.Collapse className='hidden md:block'>
					<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Login()} active={pathname === AppRoutes.Login()}>
						Login
					</Navbar.Link>
					<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Register()} active={pathname === AppRoutes.Register()}>
						Register
					</Navbar.Link>
				</Navbar.Collapse>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Home()} active={pathname === AppRoutes.Home()}>
					Home
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Exchanges()} active={pathname === AppRoutes.Exchanges()}>
					Exchanges
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light' to={AppRoutes.Wishlists()} active={pathname === AppRoutes.Wishlists()}>
					Wishlists
				</Navbar.Link>
				<Navbar.Link as={NavLink} className='text-base font-light md:hidden' to={AppRoutes.Login()} active={pathname === AppRoutes.Login()}>
					Login
				</Navbar.Link>
				<Navbar.Link
					as={NavLink}
					className='text-base font-light md:hidden'
					to={AppRoutes.Register()}
					active={pathname === AppRoutes.Register()}
				>
					Register
				</Navbar.Link>
			</Navbar.Collapse>
		</>
	)
}

const Header = () => {
	const { user } = useAuthStore()
	const { pathname } = useLocation()

	return (
		<Navbar className='sticky top-0' fluid>
			<Navbar.Brand as={Link} to={AppRoutes.Home()} className='h-14'>
				<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Secret Santa</span>
			</Navbar.Brand>
			{user && user.uid ? <AuthenticatedNav pathname={pathname} user={user} /> : <UnauthenticatedNav pathname={pathname} />}
		</Navbar>
	)
}

export default Header
