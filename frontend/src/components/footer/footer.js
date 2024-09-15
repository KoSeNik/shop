import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>
				<div>© Все права защищены</div>
				<div>ДФК Звезда</div>
			</div>
			<div>
				<div>Связаться с разработчиком</div>
				<div>
					<a href="https://t.me/SergKomarov" target="_blank" rel="noreferrer">
						Telegram
					</a>
					|
					<a href="https://github.com/KoSeNik" target="_blank" rel="noreferrer">
						Github
					</a>
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	box-shadow: 0 -5px 10px #7db94b;
	baground-color: #fff;

	a {
		color: black;
		text-decoration: none;
		padding: 0px 20px;
	}

	a:hover {
		text-decoration: underline;
	}

	a:visited {
		color: grey;
	}
`;
