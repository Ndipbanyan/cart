import {
	render,
	screen,
} from '@testing-library/react'
import Product from './Product'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../redux/app/store'

test('products are displayed on page', async () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Product
					data={{
						sku: 1,
						name: 'Product One',
						description:
							'Product One description',
						price: 1.11,
						basketLimit: 5,
						quantity: 1,
					}}
					add={() => {}}
					remove={() => {}}
				/>
			</MemoryRouter>
		</Provider>
	)

	const productElement =
		screen.getByTestId('list')

	expect(productElement).toBeInTheDocument()
})
