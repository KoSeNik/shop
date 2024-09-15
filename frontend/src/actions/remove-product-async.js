import { request } from '../utils';

export const removeProductAsync = (id) => () => request(`/products/${id}`, 'DELETE');
