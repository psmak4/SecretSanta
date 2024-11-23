import { Unsubscribe } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../lib/Firebase'
import Exchange from '../types/Exchange'

const ExchangeService = {
	GetExchangesSubscriptionByIds: (exchangeIds: string[], onUpdate: (newExchanges: Exchange[]) => void): Unsubscribe => {
		const exchangeQuery = query(collection(db, 'exchanges'), where('__name__', 'in', exchangeIds))
		const unsubscribe = onSnapshot(exchangeQuery, (snapshot) => {
			const exchanges: Exchange[] = []
			snapshot.forEach((doc) => {
				exchanges.push({
					id: doc.id,
					...doc.data(),
				} as Exchange)
			})
			onUpdate(exchanges)
		})

		return unsubscribe
	},
}

export default ExchangeService
