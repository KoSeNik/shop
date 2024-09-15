import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils';
import { H2, Icon, Loader } from '../../components';
import { Pagination } from '../main/components';
import { PAGINATION_LIMIT } from '../../constants';
import { CLOSE_MODAL, openModal, removeProductAsync } from '../../actions';
import styled from 'styled-components';

const ListProductsContainer = ({ className }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestProducts = () => {
		request(`/products?page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { products, lastPage } }) => {
				setProducts(products);
				setLastPage(lastPage);
				setIsLoading(false);
			},
		);
	};

	useEffect(() => {
		requestProducts();
		// eslint-disable-next-line
	}, [page]);

	const removeFromList = (id) => {
		dispatch(
			openModal({
				text: 'Удалить продукт?',
				onConfirm: () => {
					dispatch(removeProductAsync(id)).then(() => {
						navigate('/listproducts');
						requestProducts();
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<H2>Список всех товаров и услуг</H2>
			<div className="listproducts-main">
				<p>Фото</p>
				<p>Название</p>
				<p>Цена</p>
				<p>Категория</p>
				<p>Удалить</p>
			</div>
			<div className="listproducts-all">
				<hr />
				{products.map((product, index) => {
					return (
						<div key={index}>
							<div className="listproducts-main listproducts-format">
								<img
									src={product.image}
									alt="изображение продукта"
									className="listproducts-img"
									onClick={() => navigate(`/product/${product.id}`)}
								/>
								<p>{product.title}</p>
								<p>{product.price} Р</p>
								<p>
									{product.category === 'training'
										? 'Тренировки'
										: 'Вещи'}
								</p>
								<Icon
									id="fa-trash-o"
									size="21px"
									margin="10px"
									onClick={() => removeFromList(product.id)}
								/>
							</div>
							<hr />
						</div>
					);
				})}
			</div>
			{lastPage > 1 && products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const ListProducts = styled(ListProductsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 30px 50px 90px 50px;

	& .listproducts-main {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
		gap: 10px;
		width: 100%;
		color: #454545;
		font-size: 15px;
		font-weight: 600;
	}

	& .listproducts-all {
		width: 100%;
		align-items: center;
		overflow-y: auto;
	}

	& .listproducts-format {
		align-items: center;
		font-weight: 500;
		padding: 10px 0;

	& .listproducts-img {
		height: 80px;
	}

	& .listproducts-img:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
