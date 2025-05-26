import './styles.css';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Draggable from 'react-draggable';

import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

function ProductDetail() {
	const {
		isProductDetailOpen,
		closeProductDetail,
		productToShow,
	} = useContext(ShoppingCartContext);

	if (!isProductDetailOpen) return null;

	return (
		<Draggable handle='.product-detail-handle'>
			<aside
				className='product-detail flex-col fixed right-0 border border-black rounded-lg bg-white min-h-[400px]'
				style={{ zIndex: 1000, minWidth: 350 }}
			>
				<div className='product-detail-handle flex justify-between items-center p-4 cursor-move'>
					<h2 className='font-medium text-xl'>Details</h2>
					<XCircleIcon
						className='size-6 text-black cursor-pointer'
						onClick={closeProductDetail}
					/>
				</div>
				{productToShow && productToShow.image && (
					<figure className='px-6'>
						<img
							className='w-full h-full rounded-lg'
							src={productToShow.image}
							alt={productToShow.title}
						/>
					</figure>
				)}
				<p className='flex flex-col p-6'>
					{productToShow && productToShow.price && (
						<span className='font-medium text-2xl mb-2'>
							${productToShow.price}
						</span>
					)}
					{productToShow && productToShow.title && (
						<span className='font-medium text-md mb-1'>
							{productToShow.title}
						</span>
					)}
					{productToShow && productToShow.description && (
						<span className='font-light text-sm'>
							{productToShow.description}
						</span>
					)}
				</p>
			</aside>
		</Draggable>
	);
}

export { ProductDetail };
