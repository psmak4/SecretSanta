import { BrowserRouter } from 'react-router-dom'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import AppRouter from './AppRouter'

function App() {
	useFirebaseAuth()

	return (
		<BrowserRouter
			future={{
				v7_relativeSplatPath: true,
				v7_startTransition: true,
			}}
		>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
