import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 22px;
	font-weight: 600;
	line-height: 40px;
	text-align: center;
`;

const SmallText = styled.div`
	font-size: 16px;
	font-weight: bold;
	font-style: italic;
	text-align: center;
`;

const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	gap: 50px;
	color: #626262;
	font-weight: 400;
	padding-left: 0px;

	& li {
		cursor: pointer;
	}

	& hr {
		border: none;
		width: 85%;
		height: 3px;
		border-radius: 10px;
		background: #2e5f3c;
	}
`;

const HeaderContainer = ({ className }) => {
	const [menu, setMenu] = useState('');
	const location = useLocation();

	useEffect(() => {
		const currentUrl = location.pathname;
		if (currentUrl === '/training') {
			setMenu('training');
		} else if (currentUrl === '/things') {
			setMenu('things');
		} else if (currentUrl === '/') {
			setMenu('allServices');
		} else setMenu('');
	}, [location.pathname]);

	return (
		<header className={className}>
			<Logo />
			<div>
				<LargeText>Детский футбольный клуб "Звезда"</LargeText>
				<SmallText>Магазин продажи футбольных услуг</SmallText>
				<NavMenu>
					<li
						onClick={() => {
							setMenu('allServices');
						}}
					>
						<Link to="/">Все услуги</Link>{' '}
						{menu === 'allServices' ? <hr /> : <></>}
					</li>
					<li
						onClick={() => {
							setMenu('training');
						}}
					>
						<Link to="/training">Купить тренировки</Link>{' '}
						{menu === 'training' ? <hr /> : <></>}
					</li>
					<li
						onClick={() => {
							setMenu('things');
						}}
					>
						<Link to="/things">Купить вещи</Link>{' '}
						{menu === 'things' ? <hr /> : <></>}
					</li>
				</NavMenu>
			</div>
			<ControlPanel />
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 140px;
	padding: 20px 40px;
	box-shadow: 0 5px 10px #7db94b;
	background-color: #fff;
	z-index: 10;
`;
