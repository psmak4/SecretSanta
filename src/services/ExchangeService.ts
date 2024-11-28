import { Unsubscribe } from 'firebase/auth'
import { addDoc, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../lib/Firebase'
import Exchange from '../types/Exchange'

type CreateNewExchangeProps = {
	budget: number
	createdBy: string
	dateCreated: Date
	description: string
	exchangeDate: Date
	name: string
}

const ExchangeService = {
	CreateNewExchange: async (newExchange: CreateNewExchangeProps): Promise<void> => {
		const exchangeRef = await addDoc(collection(db, 'exchanges'), newExchange)

		const userRef = doc(db, 'users', newExchange.createdBy)
		await updateDoc(userRef, {
			exchangeIds: arrayUnion(exchangeRef.id),
		})
	},
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
