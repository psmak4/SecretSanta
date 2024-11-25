import { Unsubscribe } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { create } from 'zustand'
import { db } from '../lib/Firebase'
import WishlistService from '../services/WishlistService'
import ExchangeService from '../services/exchangeService'
import Exchange from '../types/Exchange'
import User from '../types/User'
import Wishlist from '../types/Wishlist'
import useAuthStore from './useAuthStore'

type UserProfileState = {
	exchangeIds: string[]
	exchanges: Exchange[]
	wishlistIds: string[]
	wishlists: Wishlist[]
}

const defaultUserProfile: UserProfileState = {
	exchanges: [],
	wishlists: [],
	exchangeIds: [],
	wishlistIds: [],
}

const useStore = create<UserProfileState>(() => defaultUserProfile)

const clearUserProfile = () => useStore.setState(defaultUserProfile)

const setExchanges = (exchanges: Exchange[]) => useStore.setState({ exchanges })
const setExchangeIds = (exchangeIds: string[]) => useStore.setState({ exchangeIds })

const setWishlists = (wishlists: Wishlist[]) => useStore.setState({ wishlists })
const setWishlistIds = (wishlistIds: string[]) => useStore.setState({ wishlistIds })

const useUserProfile = () => {
	const { user } = useAuthStore()
	const { exchangeIds, exchanges, wishlistIds, wishlists } = useStore((state) => state)

	useEffect(() => {
		let userProfileUnsubscribe: Unsubscribe = () => undefined

		if (user) {
			userProfileUnsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
				const { exchangeIds, wishlistIds } = doc.data() as User
				setExchangeIds(exchangeIds)
				setWishlistIds(wishlistIds)
			})
		} else {
			clearUserProfile()
		}

		return () => {
			userProfileUnsubscribe()
		}
	}, [user])

	useEffect(() => {
		let exchangesUnsubscribe: Unsubscribe = () => undefined

		if (exchangeIds.length === 0) {
			setExchanges([])
		} else {
			exchangesUnsubscribe = ExchangeService.GetExchangesSubscriptionByIds(exchangeIds, setExchanges)
		}

		return () => {
			exchangesUnsubscribe()
		}
	}, [exchangeIds])

	useEffect(() => {
		let wishlistsUnsubscribe: Unsubscribe = () => undefined

		if (wishlistIds.length === 0) {
			setWishlists([])
		} else {
			wishlistsUnsubscribe = WishlistService.GetWishlistsSubscriptionByIds(wishlistIds, setWishlists)
		}

		return () => {
			wishlistsUnsubscribe()
		}
	}, [wishlistIds])

	return { exchanges, wishlists }
}

export default useUserProfile
