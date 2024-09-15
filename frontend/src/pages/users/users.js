import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { H2, Loader, PrivateContent } from '../../components';
import { UserRow, TableRow } from './components';
import { ROLE } from '../../constants';
import { checkAccess, request } from '../../utils';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			setIsLoading(false);
			return;
		}

		Promise.all([request('/users'), request('/users/roles')])
			.then(([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			})
			.catch((error) => {
				console.error('Ошибка при загрузке пользователей: ', error);
				setErrorMessage('Ошибка при загрузке пользователей');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div className="table-users">
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
	}

	& .table-users {
		margin-bottom: 40px;
	}
`;
