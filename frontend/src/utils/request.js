export function request(url, method, data) {
	return fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
