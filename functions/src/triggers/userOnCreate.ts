import admin = require('firebase-admin')
import functions = require('firebase-functions/v1')

const UserOnCreate = functions.auth.user().onCreate(async (user) => {
	const db = admin.firestore()

	const newUser = {
		email: user.email,
		exchanges: [],
		wishlists: [],
	}

	try {
		await db.collection('users').doc(user.uid).set(newUser)
		console.log('new user record created', user.uid)
	} catch (error) {
		console.error(error)
	}
})

export default UserOnCreate
