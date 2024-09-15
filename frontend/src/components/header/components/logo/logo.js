import { Link } from 'react-router-dom';
import imageLogo from '../../../../assets/logo.jpg';
import styled from 'styled-components';

const Image = styled.img`
	margin: 0;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Image src={imageLogo}></Image>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	width: 60px;
`;
