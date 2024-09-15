import { request } from '../utils';
import { setCartData } from './set-cart-data';

export const saveCartAsync = (newCartData) => (dispatch) =>
	request('/carts', 'POST', newCartData).then((response) => {
		dispatch(setCartData(response.data));
		return response.data;
	});
