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
import ArrayUtils from '../utils/ArrayUtils'
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
		let exchangesUnsubscribe: Unsubscribe = () => undefined
		let wishlistsUnsubscribe: Unsubscribe = () => undefined
		let userProfileUnsubscribe: Unsubscribe = () => undefined

		if (user) {
			userProfileUnsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
				const userData = doc.data() as User
				const { exchangeIds: newExchangeIds, wishlistIds: newWishlistIds } = userData

				if (!ArrayUtils.compareArrays(exchangeIds, newExchangeIds)) {
					setExchangeIds(newExchangeIds)
					exchangesUnsubscribe = ExchangeService.GetExchangesSubscriptionByIds(newExchangeIds, setExchanges)
				}

				if (!ArrayUtils.compareArrays(wishlistIds, newWishlistIds)) {
					setWishlistIds(newWishlistIds)
					wishlistsUnsubscribe = WishlistService.GetWishlistsSubscriptionByIds(newWishlistIds, setWishlists)
				}
			})
		} else {
			clearUserProfile()
		}

		return () => {
			exchangesUnsubscribe()
			wishlistsUnsubscribe()
			userProfileUnsubscribe()
		}
	}, [user])

	return { exchanges, wishlists }
}

export default useUserProfile
