import { useContext } from 'react';

import { Layout } from '../../Components/Layout';
import { Card } from '../../Components/Card';
import { ProductDetail } from '../../Components/ProductDetail';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { ShoppingCartContext } from '../../Context';

function Home() {
	const {
		filteredItems: itemsToRender,
	} = useContext(ShoppingCartContext);

	const renderView = () => {
		if (itemsToRender?.length > 0) {
			return itemsToRender?.flatMap((item) => {
				if (item.id === 3) {
					return [1,2,3,4].map((cloneNum) => (
						<Card key={item.id + '-clone' + cloneNum} data={{...item, id: item.id * 10 + cloneNum}} />
					));
				}
				return <Card key={item.id} data={item} />;
			});
		} else {
			return (
				<div className='flex flex-col items-center justify-center col-span-4 mt-6'>
					<InformationCircleIcon className='h-6 w-6 mb-2' />
					<p>No products found</p>
				</div>
			);
		}
	};

	return (
		<Layout>
			<div className='flex items-center justify-center w-full mb-8'>
				<h1 className='font-bold text-3xl'>
					All Products
				</h1>
			</div>
			<hr className='w-full border-t-2 border-green-900 mb-8' />
			<div className='flex flex-col w-full max-w-screen-lg'>
				<div className='grid grid-cols-4 gap-6 w-full max-w-screen-lg'>
					{renderView()}
				</div>
			</div>
			<ProductDetail />
		</Layout>
	);
}

export default Home;
