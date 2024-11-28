import { PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router'

type LinkProps = {
	to: string
}

const Link = ({ to, children }: PropsWithChildren<LinkProps>) => {
	return (
		<RouterLink to={to} className='text-cyan-700 hover:underline'>
			{children}
		</RouterLink>
	)
}

export default Link
