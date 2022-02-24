// import './App.css'
import './styling/tailwind.output.css'
import Products from './views/products/Products'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import Basket from './views/checkout/basket/Basket'
import Thankyou from './views/success/Thankyou'

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Products />}
				></Route>
				<Route
					path='/success'
					element={<Thankyou />}
				></Route>

				<Route
					path='/basket'
					element={<Basket />}
				/>
			</Routes>
		</Router>
	)
}

export default App
