import { Outlet } from 'react-router'

const FormLayout = () => {
	return (
		<div className='mt-12 mb-20 w-[30rem] mx-auto'>
			<Outlet />
		</div>
	)
}

export default FormLayout
