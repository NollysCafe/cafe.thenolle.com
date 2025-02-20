import React from 'react'

import '../styles/pages/error.scss'

// Components
import { Link } from 'react-router-dom'
import * as Fa6 from 'react-icons/fa6'

interface ErrorProps {
	code: number
	message: string
}

export default function Error({ code, message }: ErrorProps): React.ReactElement {
	return (
		<main className='page error'>
			<h1 className='error-code'>{code}</h1>
			<p className='error-message'>{message}</p>
			<Link className='error-button' to='/'><Fa6.FaHouseUser /> Go Home</Link>
		</main>
	)
}
