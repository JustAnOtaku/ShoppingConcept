import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

function Navbar() {
	const context = useContext(ShoppingCartContext);
	const activeStyle =
		'underline underline-offset-4';

	return (
		<nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-ligth bg-emerald-500 shadow-md'>
			<div className='flex w-full items-center justify-between'>
				<ul className='flex items-center gap-3'>
					<li className='font-semibold text-lg'>
						<NavLink to='/'>dev6</NavLink>
					</li>
					<li>
						<NavLink
							to='/'
							onClick={() =>
								context.setSearchByCategory(null)
							}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							All
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/clothes'
							onClick={() =>
								context.setSearchByCategory(
									"men's clothing"
								)
							}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							Clothes
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/braincells'
							onClick={() =>
								context.setSearchByCategory('braincells')
							}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							Braincells
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/others'
							onClick={() =>
								context.setSearchByCategory('others')
							}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							Others
						</NavLink>
					</li>
				</ul>

				<div className='flex-1 flex justify-center'>
					<div className='w-64'>
						<input
							type='text'
							placeholder='Search a product'
							className='rounded-lg border border-black w-full p-2 focus:outline-none text-left'
							onChange={(event) =>
								context.setSearchByTitle(event.target.value)
							}
						/>
					</div>
				</div>

				<ul className='flex items-center gap-3'>
					<li>
						<NavLink
							to='/my-orders'
							onClick={() => {
								context.setSearchByCategory(null);
								context.setSearchByTitle(null);
							}}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							History
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/my-account'
							onClick={() => {
								context.setSearchByCategory(null);
								context.setSearchByTitle(null);
							}}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							My Account
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/sign-in'
							onClick={() => {
								context.setSearchByCategory(null);
								context.setSearchByTitle(null);
							}}
							className={({ isActive }) =>
								isActive ? activeStyle : undefined
							}
						>
							Sign In
						</NavLink>
					</li>
					<li className='flex'>
						<span className="text-black font-medium">Cart</span>{' '}
						{context.cartProducts.length}
					</li>
				</ul>
			</div>
		</nav>
	);
}

export { Navbar };
