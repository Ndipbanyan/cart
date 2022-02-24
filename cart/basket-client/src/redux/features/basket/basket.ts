import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../../utils/types'
interface InitialProp {
  basket: IProduct[]
  itemQty: { id: number; quantity: string }
}

const initialState: InitialProp = {
  basket: [],
  itemQty: { id: 0, quantity: '' },
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const foundItem = state.basket.findIndex(
        (item) => item.sku === action.payload.sku
      )

      if (foundItem !== -1) {
        state.basket[foundItem].quantity! += 1
      } else {
        const newData: IProduct = {
          ...action.payload,
          quantity: 1,
          disableAddbutton: false,
          disableRemovebutton: false,
        }
        state.basket.push(newData)
      }
    },
    removeItem: (state, action) => {
      const foundItem = state.basket.findIndex(
        (item) => item.sku === action.payload.sku
      )

      if (state.basket[foundItem].quantity! > 1) {
        state.basket[foundItem].quantity!--
      } else {
        state.basket.splice(foundItem, 1)
      }
    },
    changeItemQty: (state, action) => {
      const foundItem = state.basket.findIndex(
        (item) => item.sku === action.payload.id
      )
      state.basket[foundItem].quantity = Number(
        action.payload.quantity
      )
      state.itemQty = action.payload
    },
    removeAllItem: (state, action) => {
      const filteredBasket = state.basket.filter(
        (item) => item.sku !== action.payload
      )
      state.basket = filteredBasket
    },
    checkoutSuccess: (state, action) => {
      state.basket = action.payload
    },
  },
})

export const {
  addItem,
  removeItem,
  changeItemQty,
  removeAllItem,
  checkoutSuccess,
} = basketSlice.actions
export default basketSlice.reducer
