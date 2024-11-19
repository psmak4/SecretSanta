import { Unsubscribe, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../lib/Firebase'
import useAuthStore from './useAuthStore'

const useFirebaseAuth = () => {
	const { setUser } = useAuthStore()

	useEffect(() => {
		const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => setUser(user))

		return () => {
			unsubscribe()
		}
	}, [])
}

export default useFirebaseAuth
