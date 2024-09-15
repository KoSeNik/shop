import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProductCardContainer = ({ className, id, title, image, price }) => {
	return (
		<div className={className}>
			<Link to={`/product/${id}`}>
				<img src={image} alt={title} />
				<div className="product-card">
					<p>{title}</p>
					<div className="price">{price} Р</div>
				</div>
			</Link>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& .product-card {
		padding: 5px;
	}

	& p {
		margin: 6px 0;
	}

	& .price {
		display: flex;
		font-size: 18px;
		font-weight: 600;
	}

	&:hover {
		transform: scale(1.05);
		transition: 0.5s;
	}
`;

ProductCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};
