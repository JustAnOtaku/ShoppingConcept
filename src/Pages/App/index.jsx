import {
	useRoutes,
	BrowserRouter,
} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ShoppingCartProvider } from '../../Context';

import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';

import { Navbar } from '../../Components/Navbar';
import { CheckoutSideMenu } from '../../Components/CheckoutSideMenu';
import Hero from '../../Components/Hero';

import './App.css';

const AppRoutes = () => {
	let routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/clothes', element: <Home /> },
		{ path: '/electronics', element: <Home /> },
		{ path: '/jewelery', element: <Home /> },
		{ path: '/toys', element: <Home /> },
		{ path: '/others', element: <Home /> },
		{ path: '/', element: <Home /> },
		{
			path: '/my-account',
			element: <MyAccount />,
		},
		{ path: '/my-order', element: <MyOrder /> },
		{
			path: '/my-orders',
			element: <MyOrders />,
		},
		{
			path: '/my-orders/last',
			element: <MyOrder />,
		},
		{
			path: '/my-orders/:id',
			element: <MyOrder />,
		},
		{ path: '/*', element: <NotFound /> },
		{ path: '/signin', element: <SignIn /> },
	]);

	return routes;
};

function AppContent() {
	const location = useLocation();
	const hideHeroOn = ['/my-orders', '/my-order', '/my-account', '/sign-in'];
	const shouldShowHero = !hideHeroOn.some((path) => location.pathname.startsWith(path));

	return (
		<>
			{shouldShowHero && <Hero />}
			<AppRoutes />
			<Navbar />
			<CheckoutSideMenu />
		</>
	);
}

function App() {
	return (
		<ShoppingCartProvider>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</ShoppingCartProvider>
	);
}

export default App;
