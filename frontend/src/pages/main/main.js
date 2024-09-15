import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, ProductCard, Seacrh } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce } from './utils';
import { request } from '../../utils';
import { selectUserId } from '../../selectors';
import { loadCartAsync } from '../../actions';
import { Button, Loader } from '../../components';
import styled from 'styled-components';

const MainContainer = ({ className, ...props }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [sortDirection, setSortDirection] = useState('increase');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		if (props.category) {
			setSelectedCategory(props.category);
		} else setSelectedCategory('');
		request(
			`/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortDirection=${sortDirection}&selectedCategory=${selectedCategory}`,
		).then(({ data: { products, lastPage } }) => {
			let sortedProducts;
			if (sortDirection === 'increase') {
				sortedProducts = products
					.slice()
					.sort((a, b) => parseInt(a.price) - parseInt(b.price));
			} else {
				sortedProducts = products
					.slice()
					.sort((a, b) => parseInt(b.price) - parseInt(a.price));
			}

			setProducts(sortedProducts);
			setLastPage(lastPage);
			setIsLoading(false);
		});
		if (userId) {
			dispatch(loadCartAsync(userId));
		}
	}, [
		page,
		shouldSearch,
		searchPhrase,
		sortDirection,
		userId,
		props.category,
		selectedCategory,
		dispatch,
	]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const handleSortDirection = () => {
		const newSortDirection = sortDirection === 'increase' ? 'decrease' : 'increase';
		setSortDirection(newSortDirection);
	};

	return (
		<div className={className}>
			<div className="search-and-sort">
				<Seacrh searchPrase={searchPhrase} onChange={onSearch} />
				<Button onClick={handleSortDirection}>
					Отсортировать по{' '}
					{sortDirection === 'increase' ? 'убыванию' : 'возрастанию'} цены
				</Button>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{products.length > 0 ? (
						<div className="product-list">
							{products.map(({ id, title, image, price }) => (
								<ProductCard
									key={id}
									id={id}
									title={title}
									image={image}
									price={price}
								/>
							))}
						</div>
					) : (
						<div className="no-products-found">Продукты не найдены</div>
					)}
				</>
			)}
			{lastPage > 1 && products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .search-and-sort {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
		height: 70px;
	}

	& .search-and-sort button {
		width: 362px;
		height: 40px;
		outline: none;
		border: none;
		font-size: 16px;
		font-weight: 600;
		color: white;
		background: #2e5f3c;
	}

	& .search-and-sort button:hover {
		background: #144123;
	}

	& .product-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-products-found {
		font-size: 18px;
		margin-top: 30px;
		text-align: center;
	}
`;
