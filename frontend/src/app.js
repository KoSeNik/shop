import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Header, Footer, Modal, Banner } from './components';
import {
	Authorization,
	Main,
	Registration,
	Users,
	Product,
	Cart,
	AddProduct,
	ListProducts,
} from './pages';
import { setUser } from './actions';
import { selectUserId } from './selectors';
import { ERROR } from './constants';
import styled from 'styled-components';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	position: relative;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

export const App = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppContainer>
			<Header userId={String(userId)} />
			<Banner />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/training" element={<Main category="training" />} />
				<Route path="/things" element={<Main category="things" />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/users" element={<Users />} />
				<Route path="/product" element={<Product />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/product/:id/edit" element={<Product />} />
				<Route path="/addproduct" element={<AddProduct />} />
				<Route path="/listproducts" element={<ListProducts />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/cart/:userId" element={<Cart />} />
				<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
			</Routes>
			<Footer />
			<Modal />
		</AppContainer>
	);
};
