import { ACTION_TYPE } from './action-type';

export const addToCart = (id, data) => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: { id, data },
});
