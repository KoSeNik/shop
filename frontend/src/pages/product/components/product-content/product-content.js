import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { addToCartAsync } from '../../../../actions';
import { selectCartId, selectCartProducts, selectUserId } from '../../../../selectors';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const ProductContentContainer = ({
	className,
	product: { id, title, image, description, price },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartId = useSelector(selectCartId);
	const userId = useSelector(selectUserId);
	const cartProducts = useSelector(selectCartProducts);
	const [cartItemCount, setCartItemCount] = useState(1);

	useEffect(() => {
		let count = 0;
		let productChahgeCount = cartProducts.find((item) => item.productId === id);
		count = productChahgeCount?.productCount + 1;
		setCartItemCount(count);
	}, [cartProducts, id]);

	const addToCart = () => {
		if (userId) {
			const newCartData = {
				productId: id,
				productImage: image,
				productName: title,
				productPrice: price,
				productCount: cartItemCount,
			};
			dispatch(addToCartAsync(cartId, newCartData));
		} else {
			navigate(`/login`);
		}
	};

	return (
		<div className={className}>
			<div className="product-display-left">
				<img src={image} alt={title} />
			</div>
			<div className="product-display-right">
				<H2>{title}</H2>
				<div className="product-text">{description}</div>
				<div className="price">{price} Р</div>
				<Button onClick={addToCart}>Добавить в корзину</Button>
			</div>

			<SpecialPanel
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="20px 20px 0 0"
						onClick={() => navigate(`/product/${id}/edit`)}
					/>
				}
			/>
		</div>
	);
};

export const ProductContent = styled(ProductContentContainer)`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	padding: 24px;
	column-gap: 32px;

	& .product-display-left {
		display: flex;
	}

	& .product-display-right {
		margin: 0px 20px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	& .product-text {
		font-size: 18px;
		white-space: pre-line;
		text-align: justify;
	}

	& .price {
		margin: 40px 0px;
		color: #656565;
		font-size: 24px;
		font-weight: 700;
	}

	& button {
		width: 200px;
		height: 48px;
		font-weight: 600;
		color: white;
		background: #2e5f3c;
	}

	& button:hover {
		background: #144123;
	}
`;

ProductContent.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
