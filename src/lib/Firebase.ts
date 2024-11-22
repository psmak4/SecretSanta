import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = {
	apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
	authDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
	projectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
	storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
	messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGEINGSENDERID),
	appId: String(import.meta.env.VITE_FIREBASE_APPID),
	measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENTID),
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
