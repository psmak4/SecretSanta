import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { HR, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import AppForm from '../components/AppForm'
import Link from '../components/Link'
import AppRoutes from '../constants/AppRoutes'
import { auth } from '../lib/Firebase'

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required()

interface IRegisterUser extends yup.InferType<typeof schema> {}

const Register = () => {
	const pageTitle = 'Register'
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterUser>({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: IRegisterUser) => {
		try {
			const { email, password } = data

			await createUserWithEmailAndPassword(auth, email, password)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	useEffect(() => {
		document.title = pageTitle
	}, [])

	return (
		<>
			<h1 className='text-2xl text-center'>{pageTitle}</h1>
			<HR />
			<AppForm onSubmit={handleSubmit(onSubmit)} submitText='Register'>
				<div>
					<Label htmlFor='name' value='Name' className='block mb-2' />
					<TextInput
						type='text'
						id='name'
						placeholder='name@email.com'
						color={errors.email ? 'failure' : undefined}
						helperText={errors.email?.message}
						{...register('email')}
					/>
				</div>

				<div>
					<Label htmlFor='password' value='Password' className='block mb-2' />
					<TextInput
						type='password'
						id='password'
						placeholder='********'
						color={errors.password ? 'failure' : undefined}
						helperText={errors.password?.message}
						{...register('password')}
					/>
				</div>
			</AppForm>
			<HR />
			<div>
				Already have an account? <Link to={AppRoutes.Login()}>Login</Link>
			</div>
		</>
	)
}

export default Register
