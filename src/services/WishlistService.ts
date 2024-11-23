import { Unsubscribe } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/Firebase'
import Wishlist from '../types/Wishlist'

const WishlistService = {
	GetWishlistsSubscriptionByIds: (wishlistIds: string[], onUpdate: (newWishlists: Wishlist[]) => void): Unsubscribe => {
		const wishlistQuery = query(collection(db, 'wishlists'), where('__name__', 'in', wishlistIds))
		const unsubscribe = onSnapshot(wishlistQuery, (snapshot) => {
			const wishlists: Wishlist[] = []
			snapshot.forEach((doc) => {
				wishlists.push({
					id: doc.id,
					...doc.data(),
				} as Wishlist)
			})
			onUpdate(wishlists)
		})

		return unsubscribe
	},
}

export default WishlistService
