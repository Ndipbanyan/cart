import React from 'react'
import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/app/hooks'
import {
  changeItemQty,
  checkoutSuccess,
  removeAllItem,
} from '../../../redux/features/basket/basket'
import {
  totalItemsInBasket,
  totalBasketItemsPrice,
} from '../../../utils/helpers'

const Basket = () => {
  const cardInputRegex = /^[0-9\b]+$/

  let navigate = useNavigate()
  const [cardError, setCardError] =
    useState(false)
  const [error, setError] = useState(false)
  const { basket } = useAppSelector(
    (state) => state.basketReducer
  )
  const dispatch = useAppDispatch()
  const [cardNumber, setSetCardNumber] =
    useState('')

  const isBasketEmpty =
    basket.length === 0 ? true : false

  const handleCardInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (cardInputRegex.test(e.target.value)) {
      setSetCardNumber(e.target.value)
    }
  }

  const generateSelectArray = () => {
    let selectArray = []
    let arrayGeneratedFromBasketLimit = []
    for (let i = 0; i < basket.length; i++) {
      for (
        let k = 0;
        k < basket[i].basketLimit;
        k++
      ) {
        arrayGeneratedFromBasketLimit.push(k + 1)
      }
      selectArray.push(
        arrayGeneratedFromBasketLimit
      )
      arrayGeneratedFromBasketLimit = []
    }
    return selectArray
  }
  const generatedSelectArray =
    generateSelectArray()

  const basketData = { basket, cardNumber }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(basketData),
  }

  const handleCheckout = () => {
    fetch('/checkout', options)
      .then((data) => {
        if (data.ok) {
          dispatch(checkoutSuccess([]))
          navigate('/success')
        } else {
          setCardError(true)
        }
      })
      .catch((e) => {
        setError(true)
        console.log(e)
      })
  }

  return (
    <section>
      <div className=' flex flex-row justify-end p-4 border-b text-base mr-4'>
        Basket Items: {totalItemsInBasket(basket)}
      </div>
      <div className='flex w-full justify-center m-4'>
        <table className='w-3/4 text-center table-fixed'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200 uppercase'>
              <th className='w-1/5 py-2'>
                Product Name
              </th>
              <th className='w-1/5 py-2'>
                Selected Quantity
              </th>
              <th className='w-1/5 py-2'>
                Unit Price
              </th>
              <th className='w-1/5 py-2'>
                Total Price
              </th>
              <th className='w-1/5 py-2'></th>
            </tr>
          </thead>
          <tbody className=''>
            {basket.length > 0
              ? basket.map((item, index) => (
                  <tr key={item.sku}>
                    <td className='py-4 w-1/6'>
                      {item.name}
                    </td>
                    <td className='w-1/8'>
                      <select
                        name='choice'
                        value={`${item.quantity}`}
                        onChange={(e) => {
                          dispatch(
                            changeItemQty({
                              id: item.sku,
                              quantity:
                                e.target.value,
                            })
                          )
                        }}
                      >
                        {generatedSelectArray[
                          index
                        ].map((optn) => {
                          return (
                            <option
                              key={optn}
                              value={`${optn}`}
                            >
                              {optn}
                            </option>
                          )
                        })}
                      </select>
                    </td>
                    <td className=''>
                      £{item.price}
                    </td>
                    <td className=''>
                      £
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className=''
                        onClick={() =>
                          dispatch(
                            removeAllItem(
                              item.sku
                            )
                          )
                        }
                      >
                        Remove All
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className='flex p-8 flex-row w-full justify-end'>
        Total Price: £
        {totalBasketItemsPrice(basket)}
      </div>
      <div className='flex flex-row justify-center items-center'>
        <label>Input Your Card Number</label>
        <input
          className='w-1/4 p-2 border rounded border-gray-400 ml-4'
          type='text'
          value={cardNumber}
          onChange={handleCardInputChange}
        />
      </div>
      {error && (
        <p className='text-red-600 text-center my-4'>
          sorry something went wrong. Please try
          again
        </p>
      )}
      {cardError && (
        <p className='text-red-600 text-center my-4'>
          Invalid Card. Please try again
        </p>
      )}
      <div className='flex flex-row justify-end mt-6 px-8'>
        <Link
          to={'/'}
          className='p-2 mr-4 rounded border border-gray-200  hover:bg-gray-300'
        >
          Continue Shopping
        </Link>
        <button
          className={`${
            isBasketEmpty
              ? 'bg-gray-200 hover:bg-gray-300 text-black'
              : 'bg-blue-500  hover:bg-blue-700 text-white'
          } text-s p-2 rounded`}
          disabled={isBasketEmpty}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </section>
  )
}

export default Basket
