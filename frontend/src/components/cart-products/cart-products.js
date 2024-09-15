import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Button, Loader } from '../../components';
import { selectCartId, selectCartProducts, selectUserId } from '../../selectors';
import {
	addToCartAsync,
	clearCartAsync,
	loadCartAsync,
	removeFromCartAsync,
} from '../../actions';
import styled from 'styled-components';

const CartProductsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartProducts = useSelector(selectCartProducts);
	const userId = useSelector(selectUserId);
	const cartId = useSelector(selectCartId);
	const [totalCost, setTotalCost] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let cost = 0;
		cartProducts.forEach((item) => {
			cost += item.productPrice * item.productCount;
		});
		setTotalCost(cost);
	}, [dispatch, cartProducts]);

	useEffect(() => {
		if (userId) {
			dispatch(loadCartAsync(userId))
				.then(() => {
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Ошибка при загрузке корзины: ', error);
					setIsLoading(false);
				});
		}
	}, [dispatch, userId]);

	const handleRemoveProduct = (productId) => {
		dispatch(removeFromCartAsync(cartId, productId));
	};

	const handleUpdateCount = (event, productId) => {
		const productToUpdate = cartProducts.find((item) => item.productId === productId);
		if (productToUpdate) {
			const newCartData = {
				productId: productId,
				productCount: parseInt(event.target.value),
			};
			dispatch(addToCartAsync(cartId, newCartData));
		}
	};

	const handleClearCart = () => {
		dispatch(clearCartAsync(userId))
			.then(() => {
				dispatch(loadCartAsync(userId));
			})
			.catch((error) => {
				console.error('Ошибка при очистке корзины: ', error);
			});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="cart-format-main">
				<p>Фото</p>
				<p>Название</p>
				<p>Цена</p>
				<p>Количество</p>
				<p>Сумма</p>
				<p>Удалить</p>
			</div>
			<hr />
			{cartProducts.map((item) => {
				if (cartProducts.length > 0) {
					return (
						<div key={item.productId}>
							<div className="cart-product-format cart-format-main">
								<img
									src={item.productImage}
									alt=""
									className="cart-product-image"
									onClick={() => navigate(`/product/${item.productId}`)}
								/>
								<p>{item.productName}</p>
								<p>{item.productPrice} Р</p>
								<input
									className="cart-product-count"
									type="number"
									min="1"
									value={item.productCount}
									onChange={(e) => handleUpdateCount(e, item.productId)}
								/>
								<p>{item.productPrice * item.productCount} Р</p>
								<Icon
									id="fa-trash-o"
									size="21px"
									margin="0px 40px"
									onClick={() => handleRemoveProduct(item.productId)}
								/>
							</div>
							<hr />
						</div>
					);
				}
				return null;
			})}
			<div className="cart-products-down">
				<div className="cart-products-total">
					<h3>Общая сумма</h3>
					<div>
						<div className="cart-products-total-item">
							<p>Промежуточный итог</p>
							<p>{totalCost} Р</p>
						</div>
						<hr />
						<div className="cart-products-total-item">
							<p>Доставка бесплатно</p>
							<p>0 P</p>
						</div>
						<hr />
						<div className="cart-products-total-item">
							<p>Итого</p>
							<p>{totalCost} Р</p>
						</div>
					</div>
					<Button>Оформить заказ</Button>
					<Button onClick={handleClearCart}>Очистить корзину</Button>
				</div>
			</div>
		</div>
	);
};

export const CartProducts = styled(CartProductsContainer)`
	margin: 70px 70px;

	& hr {
		height: 3px;
		background: #e2e2e2;
		border: 0;
	}

	& .cart-format-main {
		display: grid;
		grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 1fr;
		align-items: center;
		text-align: center;
		gap: 25px;
		padding: 20px 0px;
		color: #454545;
		font-size: 18px;
		font-weight: 600;
	}

	& .cart-product-format {
		font-size: 17px;
		font-weight: 500;
	}

	& .cart-product-image {
		height: 62px;
	}

	& .cart-product-image:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}

	& .cart-product-count {
		width: 44px;
		height: 50px;
		margin-left: auto;
		margin-right: auto;
		padding-left: 6px;
		font-size: 16px;
		font-weight: 500;
		border: 2px solid #ebebeb;
		background: #fff;
	}

	& .cart-products-down {
		display: flex;
		margin: 40px 0px;
	}

	& .cart-products-total {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-right: 400px;
		gap: 10px;
	}

	& .cart-products-total-item {
		display: flex;
		justify-content: space-between;
		padding: 10px 0px;
	}

	& .cart-products-total button {
		width: 262px;
		height: 48px;
		outline: none;
		border: none;
		font-size: 16px;
		font-weight: 600;
		color: white;
		background: #2e5f3c;
	}

	& .cart-products-total button:hover {
		background: #144123;
	}
`;
