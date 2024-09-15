import { request } from '../utils';
import { removeFromCart } from './remove-from-cart';

export const removeFromCartAsync = (cartId, productId) => (dispatch) => {
	request(`/carts/${cartId}/products/${productId}`, 'DELETE')
		.then(() => {
			dispatch(removeFromCart(productId));
		})
		.catch((error) => {
			console.error('Ошибка при удалении из корзины: ', error);
		});
};
