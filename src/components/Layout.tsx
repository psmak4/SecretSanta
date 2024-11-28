import { Outlet } from 'react-router'
import Header from './Header'

const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<div className='container mx-auto'>
					<Outlet />
				</div>
			</main>
		</>
	)
}

export default Layout
