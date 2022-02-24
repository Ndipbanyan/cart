import React from 'react'
import { Link } from 'react-router-dom'

const Thankyou = () => {
	return (
		<div>
			<p data-testid='success'>
				Thank you for your purchase
			</p>
			<Link to='/'>Shop More</Link>
		</div>
	)
}

export default Thankyou
