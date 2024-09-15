import PropTypes from 'prop-types';
import { ROLE } from './role';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	PRODUCT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		category: PropTypes.string.isRequired,
	}),
	CART: PropTypes.shape({
		id: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		products: PropTypes.string.isRequired,
	}),
};
