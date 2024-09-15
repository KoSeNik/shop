import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProductContent, ProductForm } from './components';
import { Breadcrumb, Error, Loader, PrivateContent } from '../../components';
import { RESET_PRODUCT_DATA, loadCartAsync, loadProductAsync } from '../../actions';
import { selectCart, selectProduct, selectUserId } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = !!useMatch('/product/addproduct');
	const isEditing = !!useMatch('/product/:id/edit');
	const product = useSelector(selectProduct);
	const cart = useSelector(selectCart);
	const userId = useSelector(selectUserId);

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadProductAsync(params.id)).then((productData) => {
			if (userId) {
				dispatch(loadCartAsync(userId));
			}
			setError(productData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating, userId]);

	if (isLoading) {
		return <Loader />;
	}

	const SpecificProductPage =
		isCreating || isEditing ? (
			<>
				<Breadcrumb product={product} />
				<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
					<div className={className}>
						<ProductForm product={product} />
					</div>
				</PrivateContent>
			</>
		) : (
			<>
				<Breadcrumb product={product} />
				<div className={className}>
					<ProductContent product={product} cart={cart} />
				</div>
			</>
		);

	return error ? <Error error={error} /> : SpecificProductPage;
};

export const Product = styled(ProductContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
