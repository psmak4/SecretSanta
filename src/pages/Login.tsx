import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AppRoutes from '../constants/AppRoutes'
import { auth } from '../lib/Firebase'

const Login = () => {
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const email = emailRef.current?.value ?? ''
		const password = passwordRef.current?.value ?? ''

		if (!email || !password) return

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate(AppRoutes.Home())
			})
			.catch((error) => {
				console.log('Unable to login:', error)
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input ref={emailRef} type='text' placeholder='Email' />
			</div>
			<div>
				<input ref={passwordRef} type='password' placeholder='Password' />
			</div>
			<button type='submit'>Login</button>
		</form>
	)
}

export default Login
