import { configureStore } from '@reduxjs/toolkit'
import basketDetails from '../features/basket/basket'

export const store = configureStore({
	reducer: {
		basketReducer: basketDetails,
	},
})

export type RootState = ReturnType<
	typeof store.getState
>
export type AppDispatch = typeof store.dispatch
