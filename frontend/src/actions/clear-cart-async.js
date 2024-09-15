import { request } from '../utils';
import { setCartData } from './set-cart-data';

export const clearCartAsync = (userId) => (dispatch) => {
	return request(`/carts/${userId}/products`, 'DELETE')
		.then(() => {
			dispatch(setCartData([]));
		})
		.catch((error) => {
			console.error('Ошибка при очистке корзины: ', error);
		});
};
