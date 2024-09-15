import { request } from '../utils';
import { setCartData } from './set-cart-data';

export const addToCartAsync = (id, newCartData) => (dispatch) => {
	request(`/carts/${id}`, 'PATCH', newCartData)
		.then((updatedCart) => {
			dispatch(setCartData(updatedCart.data));
			return updatedCart;
		})
		.catch((error) => {
			console.error('Ошибка при добавлении в корзину: ', error);
		});
};
