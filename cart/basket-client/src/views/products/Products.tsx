import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../../utils/types'
import Product from '../../components/product/Product'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/app/hooks'
import {
  addItem,
  removeItem,
} from '../../redux/features/basket/basket'
import {
  totalBasketItemsPrice,
  totalItemsInBasket,
} from '../../utils/helpers'
const Products = () => {
  const [products, setProducts] = useState<
    IProduct[] | []
  >([])
  const dispatch = useAppDispatch()
  const { basket } = useAppSelector(
    (state) => state.basketReducer
  )

  const dataFromLocalStorage =
    localStorage.getItem('products')
  useEffect(() => {
    if (dataFromLocalStorage) {
      const productsFromLocalStorage = JSON.parse(
        dataFromLocalStorage
      )
      setProducts(productsFromLocalStorage)
    } else {
      fetch('/products')
        .then((res) => res.json())
        .then((result) => {
          setProducts(result)
          localStorage.setItem(
            'products',
            JSON.stringify(result)
          )
        })
    }
  }, [])

  const handleAdd = (item: IProduct) => {
    dispatch(addItem(item))
    console.log(item.quantity)
  }
  const handleRemove = (item: IProduct) => {
    dispatch(removeItem(item))
  }
  const handleAddProduct = () => {
    const productLength = products.length
    const newProductPrice = Number(
      `${productLength + 1}.${productLength + 1}${
        productLength + 1
      }`
    ).toFixed(2)
    const newProduct = {
      sku: productLength + 1,
      name: `Product${productLength + 1}`,
      description: `Product${
        productLength + 1
      } description`,

      price: Number(newProductPrice),
      basketLimit: 4,
      quantity: 0,
    }
    setProducts([...products, newProduct])
    localStorage.setItem(
      'products',
      JSON.stringify([...products, newProduct])
    )
  }
  return (
    <div id=''>
      <section id=''>
        <div className='flex flex-row justify-end p-4 border-b text-base'>
          <div className='mr-4'>
            Basket Items:{' '}
            {totalItemsInBasket(basket)}
          </div>
          <div>
            Total Price: £
            {totalBasketItemsPrice(basket)}
          </div>
        </div>
      </section>
      <section>
        <ul className='flex flex-col mx-4'>
          {products?.map((product: IProduct) => {
            return (
              <Product
                key={`${Math.random()} ${
                  product.price
                }`}
                data={product}
                add={() => handleAdd(product)}
                remove={() =>
                  handleRemove(product)
                }
              />
            )
          })}
        </ul>
      </section>

      <div className='flex items-center justify-end mx-4'>
        <button className='text-s p-2 m-4 rounded border border-blue-600 bg-blue-500 hover:bg-blue-600  text-white'>
          <Link to='/basket'>
            Proceed to checkout
          </Link>
        </button>
        <button
          className='rounded border border-blue-600 bg-blue-500 hover:bg-blue-600  text-white'
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  )
}

export default Products
