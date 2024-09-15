import { ACTION_TYPE } from '../actions';

const initialCartState = {
	id: '',
	userId: '',
	products: [],
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.CREATE_CART:
			return initialCartState;

		case ACTION_TYPE.SET_CART_DATA:
			return {
				...state,
				...action.payload,
			};

		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				...action.payload,
			};

		case ACTION_TYPE.REMOVE_FROM_CART:
			return {
				...state,
				products: state.products.filter(
					(product) => product.productId !== action.payload,
				),
			};

		case ACTION_TYPE.CLEAR_CART:
			return initialCartState;

		case ACTION_TYPE.UPDATE_COUNT_IN_CART:
			return {
				...state,
				products: state.products.map((product) =>
					product.productId === action.payload.productId
						? { ...product, productCount: action.payload.count }
						: product,
				),
			};

		default:
			return state;
	}
};
