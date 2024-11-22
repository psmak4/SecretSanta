import { Unsubscribe } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { create } from 'zustand'
import { db } from '../lib/Firebase'
import useAuthStore from './useAuthStore'

type UserProfileState = {
	exchanges: string[]
	wishlists: string[]
}

const useStore = create<UserProfileState>(() => ({
	exchanges: [],
	wishlists: [],
}))

const setExchanges = (exchanges: string[]) => useStore.setState({ exchanges })

const setWishlists = (wishlists: string[]) => useStore.setState({ wishlists })

const useUserProfile = () => {
	const { user } = useAuthStore()

	useEffect(() => {
		let unsubscribe: Unsubscribe = () => undefined

		if (user) {
			unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
				const { exchanges, wishlists } = doc.data() as UserProfileState
				setExchanges(exchanges)
				setWishlists(wishlists)
			})
		} else {
			setExchanges([])
			setWishlists([])
		}

		return () => {
			unsubscribe()
		}
	}, [user])

	return useStore((state) => state)
}

export default useUserProfile
