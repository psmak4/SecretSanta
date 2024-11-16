import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = {
	apiKey: 'AIzaSyDCkT-CpBiZjisJw3YFlXAnDeIhLW3OHlI',
	authDomain: 'secretsanta-68851.firebaseapp.com',
	projectId: 'secretsanta-68851',
	storageBucket: 'secretsanta-68851.firebasestorage.app',
	messagingSenderId: '1003865945454',
	appId: '1:1003865945454:web:0085da393ddf49087f3d7f',
	measurementId: 'G-6N7RSQRD2K',
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

if (window.location.hostname === 'localhost') {
	console.log('testing locally -- hitting local emulators')
	connectAuthEmulator(auth, 'http://localhost:9099')
	connectFirestoreEmulator(db, 'localhost', 8080)
	connectFunctionsEmulator(functions, 'localhost', 5001)
}
