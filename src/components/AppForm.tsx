import { Button } from 'flowbite-react'
import { BaseSyntheticEvent, PropsWithChildren } from 'react'

type AppFormProps = {
	onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
	submitText: string
}

const AppForm = ({ onSubmit, submitText, children }: PropsWithChildren<AppFormProps>) => {
	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-5'>
			{children}
			<Button pill type='submit' className='mt-6'>
				{submitText}
			</Button>
		</form>
	)
}

export default AppForm
