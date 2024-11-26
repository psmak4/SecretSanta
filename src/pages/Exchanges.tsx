import { useEffect } from 'react'
import useUserProfile from '../hooks/useUserProfile'

const Exchanges = () => {
	const { exchanges } = useUserProfile()

	useEffect(() => {
		document.title = 'Exchanges'
	}, [])

	return (
		<ul>
			{exchanges.map((exchange) => (
				<li key={exchange.id}>{exchange.name}</li>
			))}
		</ul>
	)
}

export default Exchanges
