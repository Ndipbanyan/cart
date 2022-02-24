import React from 'react'
import {
	render,
	screen,
} from '@testing-library/react'
import Thankyou from './Thankyou'
import { MemoryRouter } from 'react-router-dom'

test('renders success page succeesfully', () => {
	render(
		<MemoryRouter>
			<Thankyou />
		</MemoryRouter>
	)
	const successParagraph =
		screen.getByTestId('success')
	expect(successParagraph).toBeInTheDocument()
})
