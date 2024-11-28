import { yupResolver } from '@hookform/resolvers/yup'
import { HR, Label, TextInput, Textarea } from 'flowbite-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsCurrencyDollar } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import * as yup from 'yup'
import AppForm from '../components/AppForm'
import useAuthStore from '../hooks/useAuthStore'
import ExchangeService from '../services/ExchangeService'
import Exchange from '../types/Exchange'

const schema = yup
	.object({
		name: yup.string().required(),
		description: yup.string().required(),
		exchangeDate: yup
			.date()
			.default(() => new Date())
			.required(),
		budget: yup.number().positive().integer().required(),
	})
	.required()

interface INewExchange extends yup.InferType<typeof schema> {}

const NewExchange = () => {
	const pageTitle = 'New Exchange'
	const { user } = useAuthStore()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewExchange>({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: INewExchange) => {
		try {
			const { budget, description, exchangeDate, name } = data

			// Remove timezone
			const fixedExchangeDate = exchangeDate.toISOString().split('T')
			fixedExchangeDate[1] = '00:00:00.000'

			const newExchange: Exchange = {
				budget,
				createdBy: user!.uid,
				dateCreated: new Date(),
				description,
				exchangeDate: new Date(fixedExchangeDate.join('T')),
				name,
			}

			await ExchangeService.CreateNewExchange(newExchange)

			navigate('/exchanges')
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
			<AppForm onSubmit={handleSubmit(onSubmit)} submitText='Submit'>
				<div>
					<Label htmlFor='name' value='Name' className='block mb-2' />
					<TextInput
						type='text'
						id='name'
						placeholder='My Secret Santa Exchange'
						color={errors.name ? 'failure' : undefined}
						helperText={errors.name?.message}
						{...register('name')}
					/>
				</div>

				<div>
					<Label htmlFor='description' value='Description' className='block mb-2' />
					<Textarea
						id='description'
						rows={4}
						placeholder='This is my Secret Santa Exchange description.'
						color={errors.description ? 'failure' : undefined}
						helperText={errors.description?.message}
						{...register('description')}
					/>
				</div>

				<div>
					<Label htmlFor='exchangeDate' value='Exchange Date' className='block mb-2' />
					<TextInput
						id='exchangeDate'
						type='date'
						defaultValue={new Date().toISOString().slice(0, 10)}
						min={new Date().toISOString().slice(0, 10)}
						color={errors.exchangeDate ? 'failure' : undefined}
						helperText={errors.exchangeDate?.message}
						{...register('exchangeDate')}
					/>
				</div>

				<div>
					<Label htmlFor='budget' value='Budget' className='block mb-2' />
					<TextInput
						id='budget'
						type='number'
						defaultValue={5}
						icon={BsCurrencyDollar}
						color={errors.budget ? 'failure' : undefined}
						helperText={errors.budget?.message}
						{...register('budget')}
					/>
				</div>
			</AppForm>
		</>
	)
}

export default NewExchange
