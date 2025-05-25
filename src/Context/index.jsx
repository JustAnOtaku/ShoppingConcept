import {
	createContext,
	useState,
	useEffect,
} from 'react';
import { urlApi } from '../Pages/Home/url';

// CONTEXT CREATION
const ShoppingCartContext = createContext();

// COMPONENT PROVIDER
function ShoppingCartProvider({ children }) {
	// Global states
	// Shopping Cart - Increment quantity
	const [count, setCount] = useState(0);

	// Product Detail - Open/Close
	const [
		isProductDetailOpen,
		setIsProductDetailOpen,
	] = useState(false);
	const openProductDetail = () =>
		setIsProductDetailOpen(true);
	const closeProductDetail = () =>
		setIsProductDetailOpen(false);

	// Checkout side menu - Open/Close
	const [
		isCheckoutSideMenuOpen,
		setIsCheckoutSideMenuOpen,
	] = useState(false);
	const openCheckoutSideMenu = () =>
		setIsCheckoutSideMenuOpen(true);
	const closeCheckoutSideMenu = () =>
		setIsCheckoutSideMenuOpen(false);

	// Product Detail - Show Product
	const [productToShow, setProductToShow] =
		useState({});

	// Shopping Cart - Add products to cart
	const [cartProducts, setCartProducts] =
		useState([]);

	// Shopping Cart - Orders
	const [ordersList, setOrdersList] = useState(
		[]
	);

	// LOCAL PRODUCT DATA (replace image paths as needed)
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
			// Note: Ensure the image path is correct
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
		// Add more products as needed
	];

	// API GET Products (replaced with local data)
	const [apiItems, setApiItems] = useState(localProducts);

	// Search products by title / category
	const [searchByTitle, setSearchByTitle] =
		useState(null);
	const [searchByCategory, setSearchByCategory] =
		useState(null);

	// Filtered products - search results
	const [filteredItems, setFilteredItems] =
		useState(null);

	// Filtering process by title
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

	// Filtering process by category
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

	// Filter process
	const filterBy = (
		apiItems,
		searchByTitle,
		searchByCategory
	) => {
		let filteredResults = apiItems;

		// Remove unwanted categories
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
		setFilteredItems(
			filterBy(
				apiItems,
				searchByTitle,
				searchByCategory
			)
		);

	}, [apiItems, searchByTitle, searchByCategory]);

	console.log('searchByTitle: ', searchByTitle);
	console.log(
		'searchByCategory: ',
		searchByCategory
	);

	// Concept Alert State
	const [showConceptAlert, setShowConceptAlert] = useState(true);
	const closeConceptAlert = () => setShowConceptAlert(false);

	// RETURN STATEMENT USING CONTEXT PROVIDER
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
			{/* Concept Alert */}
			{showConceptAlert && (
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					background: '#fbbf24',
					color: '#1f2937',
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
