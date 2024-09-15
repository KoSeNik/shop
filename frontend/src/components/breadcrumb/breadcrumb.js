import { Link } from 'react-router-dom';
import { Icon } from '../icon/icon';
import { PROP_TYPE } from '../../constants';
import styled from 'styled-components';

export const BreadcrumbContainer = ({ product, className }) => {
	return (
		<div className={className}>
			<Link to="/">Главная</Link>{' '}
			<Icon id="fa-caret-right" margin="0 10px" inactive={true} />{' '}
			{product.category === 'training' ? (
				<Link to="/training">Тренировки</Link>
			) : (
				<Link to="/things">Вещи</Link>
			)}{' '}
			<Icon id="fa-caret-right" margin="0 10px" inactive={true} /> {product.title}
		</div>
	);
};

export const Breadcrumb = styled(BreadcrumbContainer)`
	display: flex;
	align-items: center;
	padding-left: 10px;
`;

Breadcrumb.propTypes = {
	product: PROP_TYPE.PRODUCT,
};
