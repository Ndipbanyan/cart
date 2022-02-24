import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/app/hooks";
import { IProduct } from "../../utils/types";
interface IproductProps {
  data: IProduct;
  add: () => void;
  remove: () => void;
}

const Product = ({
  data,
  add,
  remove,
}: IproductProps) => {
  let navigate = useNavigate();
  const { basket } = useAppSelector(
    (state) => state.basketReducer
  );

  const handleClick = () => {
    navigate("/basket");
  };
  const { name, description, price } = data;

  const disableAdd = () => {
    const foundItem = basket.findIndex(
      (item) => item.sku === data.sku
    );
    if (foundItem !== -1)
      if (
        basket[foundItem].quantity >=
        data.basketLimit
      )
        return true;
  };
  const disableRemove = () => {
    const foundItemIndex = basket.findIndex(
      (item) => item.sku === data.sku
    );

    if (!basket[foundItemIndex]) return true;
  };

  return (
    <li
      className='flex w-full justify-between items-center mt-4 '
      data-testid='list'
    >
      <p
        className=' w-1/6 font-bold cursor-pointer'
        onClick={handleClick}
      >
        {name}
      </p>
      <p className='w-1/4'>{description}</p>
      <p className='w-1/8'>{price}</p>
      <button
        className={`${
          disableAdd()
            ? "bg-gray-200"
            : "bg-red-400"
        } rounded p-2`}
        onClick={add}
        disabled={disableAdd()}
      >
        Add to Basket
      </button>
      <button
        className={`${
          disableRemove()
            ? "bg-gray-200"
            : "bg-yellow-400"
        } rounded p-2`}
        onClick={remove}
        disabled={disableRemove()}
      >
        Remove from Basket
      </button>
    </li>
  );
};

export default Product;
