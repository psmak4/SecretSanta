import { BrowserRouter } from 'react-router'
import useFirebaseAuth from '../hooks/useFirebaseAuth'
import AppRouter from './AppRouter'

function App() {
	useFirebaseAuth()

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
