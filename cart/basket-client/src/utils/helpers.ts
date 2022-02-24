import { IProduct } from "./types"

export const totalItemsInBasket = (
	basketItems: IProduct[]
) => {
	let sum = 0
	for (let i = 0; i < basketItems.length; i++) {
		sum += basketItems[i].quantity
	}
	return sum
}
export const totalBasketItemsPrice = (
	basketItems: IProduct[]
) => {
	let product = 1
	let sum = 0
	for (let i = 0; i < basketItems.length; i++) {
		product =
			basketItems[i].quantity *
			basketItems[i].price
		sum += product
	}
	return Number(sum.toFixed(2))
}