import { User, signOut } from 'firebase/auth'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AppRoutes from '../constants/AppRoutes'
import useAuthStore from '../hooks/useAuthStore'
import { auth } from '../lib/Firebase'

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

		const sha256 = async (message: string) => {
			const encoder = new TextEncoder()
			const data = encoder.encode(message)
			const hashBuffer = await crypto.subtle.digest('SHA-256', data)

			const hashArray = Array.from(new Uint8Array(hashBuffer))
			const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

			return hashHex
		}

		const getGravatarUrl = async () => {
			const hashedEmail = await sha256(user?.email!)
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
		<Navbar className='shadow-md sticky top-0'>
			<Navbar.Brand as={Link} to={AppRoutes.Home()}>
				<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Secret Santa</span>
			</Navbar.Brand>
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
			</Navbar.Collapse>
		</Navbar>
	)
}

const UnauthenticatedNav = ({ pathname }: NavProps) => {
	return (
		<Navbar className='shadow-md sticky top-0'>
			<Navbar.Brand as={Link} to={AppRoutes.Home()}>
				<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Secret Santa</span>
			</Navbar.Brand>
			<Navbar.Toggle />
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

const Header = () => {
	const { user } = useAuthStore()
	const { pathname } = useLocation()

	if (user && user.uid) return <AuthenticatedNav pathname={pathname} user={user} />

	return <UnauthenticatedNav pathname={pathname} />
}

export default Header