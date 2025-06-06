import {
	createContext,
	useState,
	useEffect,
} from 'react';
import { urlApi } from '../Pages/Home/url';

const ShoppingCartContext = createContext();

function ShoppingCartProvider({ children }) {
	const [count, setCount] = useState(0);

	const [
		isProductDetailOpen,
		setIsProductDetailOpen,
	] = useState(false);
	const openProductDetail = () =>
		setIsProductDetailOpen(true);
	const closeProductDetail = () =>
		setIsProductDetailOpen(false);

	const [
		isCheckoutSideMenuOpen,
		setIsCheckoutSideMenuOpen,
	] = useState(false);
	const openCheckoutSideMenu = () =>
		setIsCheckoutSideMenuOpen(true);
	const closeCheckoutSideMenu = () =>
		setIsCheckoutSideMenuOpen(false);

	const [productToShow, setProductToShow] = useState({
		price: '',
		title: '',
		description: '',
		image: ''
	});

	const [cartProducts, setCartProducts] =
		useState([]);

	const [ordersList, setOrdersList] = useState(
		[]
	);

	const localProducts = [
		{
			id: 1,
			title: 'Sample Product 1',
			price: 19.99,
			description: 'Description for product 1',
			category: "men's clothing",
			image: '/images/pic01.png',
		},
		{
			id: 2,
			title: 'Sample Product 2',
			price: 29.99,
			description: 'Description for product 2',
			category: "men's clothing",
			image: '/images/pic02.png',
		},
		{
			id: 3,
			title: 'Sample Product 3',
			price: 39.99,
			description: 'Description for product 3',
			category: 'others',
			image: '/images/pic03.png',
		},
	];

	const [apiItems, setApiItems] = useState(localProducts);

	const [searchByTitle, setSearchByTitle] = useState('');
	const [searchByCategory, setSearchByCategory] = useState('');

	const [filteredItems, setFilteredItems] = useState(localProducts);

	const filterItemsByTitle = (
		apiItems,
		searchByTitle
	) => {
		return apiItems?.filter((item) =>
			item.title
				.toLowerCase()
				.includes(searchByTitle.toLowerCase())
		);
	};

	const filterItemsByCategory = (
		apiItems,
		searchByCategory
	) => {
		return apiItems?.filter((item) =>
			item.category
				.toLowerCase()
				.includes(searchByCategory.toLowerCase())
		);
	};

	const filterBy = (
		apiItems,
		searchByTitle,
		searchByCategory
	) => {
		let filteredResults = apiItems;

		if (filteredResults) {
			filteredResults = filteredResults.filter(
				item => !['jewelery', 'toys', 'electronics'].includes((item.category || '').toLowerCase())
			);
		}

		if (searchByCategory) {
			filteredResults = filterItemsByCategory(
				filteredResults,
				searchByCategory
			);
		}

		if (searchByTitle) {
			filteredResults = filterItemsByTitle(
				filteredResults,
				searchByTitle
			);
		}

		return filteredResults;
	};

	useEffect(() => {
		const filtered = filterBy(
			apiItems,
			searchByTitle,
			searchByCategory
		);
		if (searchByTitle !== '' || searchByCategory !== '') {
			setFilteredItems(filtered);
		} else {
			setFilteredItems(filtered && filtered.length > 0 ? filtered : localProducts);
		}
	}, [apiItems, searchByTitle, searchByCategory]);
	useEffect(() => {
		if (!filteredItems || filteredItems.length === 0) {
			setFilteredItems(localProducts);
		}
	}, []);

	console.log('searchByTitle: ', searchByTitle);
	console.log(
		'searchByCategory: ',
		searchByCategory
	);

	const [showConceptAlert, setShowConceptAlert] = useState(true);
	const closeConceptAlert = () => setShowConceptAlert(false);

	return (
		<ShoppingCartContext.Provider
			value={{
				count,
				setCount,
				openProductDetail,
				closeProductDetail,
				isProductDetailOpen,
				productToShow,
				setProductToShow,
				cartProducts,
				setCartProducts,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,
				isCheckoutSideMenuOpen,
				ordersList,
				setOrdersList,
				apiItems,
				setApiItems,
				searchByTitle,
				setSearchByTitle,
				filteredItems,
				searchByCategory,
				setSearchByCategory,
			}}
		>
			{showConceptAlert && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					background: '#fdb114',
					color: '#000000',
					padding: '16px',
					zIndex: 1000,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
					<span style={{ fontWeight: 'bold' }}>Alert! This is a concept idea not a full-fledge code</span>
					<button onClick={closeConceptAlert} style={{
						background: 'transparent',
						border: 'none',
						fontSize: '20px',
						cursor: 'pointer',
						color: '#1f2937',
					}}>&times;</button>
				</div>
			)}
			{children}
		</ShoppingCartContext.Provider>
	);
}

export {
	ShoppingCartContext,
	ShoppingCartProvider,
};
