import { User } from 'firebase/auth'
import { create } from 'zustand'

type AuthState = {
	setUser: (user: User | null) => void
	user: User | null
}

const setUser = (user: User | null) => useStore.setState({ user })

const useStore = create<AuthState>(() => ({
	setUser,
	user: null,
}))

const useAuthStore = () => useStore((state) => state)

export default useAuthStore
