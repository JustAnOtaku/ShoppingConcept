import { OrderCard } from '../OrderCard';
import { totalPrice } from '../../Utils';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

// styles
import './styles.css';
import { XCircleIcon } from '@heroicons/react/24/outline';

// components
import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

function CheckoutSideMenu() {
	// context
	const {
		isCheckoutSideMenuOpen,
		closeCheckoutSideMenu,
		cartProducts,
		setCartProducts,
		ordersList,
		setOrdersList,
		setSearchByTitle,
		setSearchByCategory,
	} = useContext(ShoppingCartContext);

	// delete product from cart
	const handleDelete = (id) => {
		const filteredProducts = cartProducts.filter(
			(product) => product.id != id
		);
		setCartProducts(filteredProducts);
	};

	// handle checkout
	const handleCheckout = () => {
		// date
		const currentDate = new Date();

		// check if there are products in the cart
		const orderToAdd = {
			date: currentDate.toLocaleDateString(),
			products: cartProducts,
			totalProducts: cartProducts.length,
			totalPrice: totalPrice(cartProducts),
		};
		// adding the current order
		setOrdersList([...ordersList, orderToAdd]);
		// cleaning the checkout cart
		setCartProducts([]);

		setSearchByTitle(null);
		setSearchByCategory(null);
	};

	return (
		<Draggable handle='.checkout-side-menu-handle'>
			<aside
				className={`${
					isCheckoutSideMenuOpen ? `flex` : `hidden`
				} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
				style={{ zIndex: 1000 }}
			>
				<div className='checkout-side-menu-handle flex justify-between items-center p-6 cursor-move'>
					<h2 className='font-medium text-xl'>
						My order
					</h2>
					<XCircleIcon
						className='size-6 text-black cursor-pointer'
						onClick={() => closeCheckoutSideMenu()}
					></XCircleIcon>
				</div>

				<div className='px-6 overflow-y-scroll flex-1'>
					{cartProducts.map((product) => (
						<OrderCard
							key={product.id}
							id={product.id}
							title={product.title}
							imageURL={product.image}
							price={product.price}
							handleDelete={handleDelete}
						/>
					))}
				</div>
				<div className='px-9 mt-6 mb-6'>
					<p className='flex justify-between items-center mb-2'>
						<span className='font-light'>
							Total:
						</span>
						<span className='font-medium text-xl'>
							₱{(totalPrice(cartProducts) * 56).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
						</span>
					</p>
					<Link to='/my-orders/last'>
						<button
							className='bg-black py-3 text-white w-full rounded-lg'
							onClick={() => {
								handleCheckout();
								closeCheckoutSideMenu();
							}}
						>
							Checkout
						</button>
					</Link>
				</div>
			</aside>
		</Draggable>
	);
}

export { CheckoutSideMenu };
