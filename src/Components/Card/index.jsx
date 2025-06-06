import {
	CheckIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

const Card = ({ data, onClickButton }) => {
	const context = useContext(ShoppingCartContext);

	const showProduct = (productDetail) => {
		context.openProductDetail();
		context.setProductToShow(productDetail);
	};

	const addProductsToCart = (
		event,
		productData
	) => {
		event.stopPropagation();
		context.setCount(context.count + 1);
		context.setCartProducts([
			...context.cartProducts,
			productData,
		]);
		context.openCheckoutSideMenu();
		context.closeProductDetail();
	};

	const renderIcon = (id) => {
		const isInCart =
			context.cartProducts.filter(
				(product) => product.id === id
			).length > 0;

		if (isInCart) {
			return (
				<div className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'>
					<CheckIcon className='size-6 text-white'></CheckIcon>
				</div>
			);
		} else {
			return (
				<div
					className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 m-2 p-1 border border-gray-400'
					onClick={(event) =>
						addProductsToCart(event, data)
					}
				>
					<PlusIcon className='size-6 text-black'></PlusIcon>
				</div>
			);
		}
	};

	return (
		<div
			className='bg-white hover:bg-slate-300 hover:cursor-pointer w-56 h-60 rounded-none mb-6'
			onClick={() => showProduct(data)}
		>
			<figure className='relative mb-2 w-full h-4/5'>
				{!['jewelery', 'toys', 'electronics'].includes((data.category || '').toLowerCase()) && (
					<span className='absolute bottom-0 left-0 bg-white/60 rounded text-black text-xs m-2 px-3 py-0.5 '>
						{data.category}
					</span>
				)}
				<img
					className='w-full h-full object-cover rounded-none'
					src={data.image}
					alt={data.title}
				/>
				{renderIcon(data.id)}
			</figure>
			<p className='flex justify-between'>
				<span className='text-sm font-light'>
					{data.title}
				</span>
				<span className='text-lg font-medium'>
					₱{(data.price * 56).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
				</span>
			</p>
			<button
				className="text-white bg-slate-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-2"
				onClick={e => {
					e.stopPropagation();
					if (onClickButton) {
						onClickButton(data);
					} else {
						addProductsToCart(e, data);
					}
				}}
			>
				Add to cart
			</button>
		</div>
	);
};

export { Card };
