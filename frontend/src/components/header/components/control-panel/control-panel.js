import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '../../../../components';
import {
	selectUserRole,
	selectUserLogin,
	selectUserId,
	selectCartProducts,
} from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	alignt-item: center;
`;

const CartCount = styled.div`
	display: flex;
	justify-content: center;
	width: 16px;
	height: 16px;
	margin-top: -8px;
	margin-left: -6px;
	border-radius: 7px;
	font-size: 12px;
	background: red;
	color: white;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	padding-top: 3px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const userId = useSelector(selectUserId);
	const cartProducts = useSelector(selectCartProducts);
	const [cartItemAllCount, setCartItemAllCount] = useState(0);

	useEffect(() => {
		let count = 0;
		cartProducts.forEach((item) => {
			count += item.productCount;
		});
		setCartItemAllCount(count);
	}, [cartProducts]);

	useEffect(() => {
		if (roleId === ROLE.GUEST) {
			setCartItemAllCount(0);
		}
	}, [roleId]);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<>
						<Button>
							<Link to="/login">Войти</Link>
						</Button>
					</>
				) : (
					<>
						<UserName>{login}</UserName>
						<Link to={`/cart/${userId}`}>
							<Icon id="fa fa-shopping-cart" margin="0 0 0 10px" />
						</Link>
						<CartCount>{cartItemAllCount}</CartCount>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-arrow-left"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				/>
				{isAdmin && (
					<>
						<Link to="/addproduct">
							<Icon id="fa-plus" margin="10px 0 0 17px" />
						</Link>
						<Link to="/listproducts">
							<Icon id="fa-list" margin="10px 0 0 17px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 17px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
