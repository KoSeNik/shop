import { request } from '../utils';
import { setCartData } from './set-cart-data';

export const loadCartAsync = (userId) => (dispatch) =>
	request(`/carts/${userId}`)
		.then((cartData) => {
			dispatch(setCartData(cartData));
			return cartData;
		})
		.catch((error) => {
			console.error('Ошибка при загрузке корзины: ', error);
		});
