import banner from '../../assets/banner.jpg';
import styled from 'styled-components';

const BannerContainer = ({ className }) => {
	return <div className={className}></div>;
};

export const Banner = styled(BannerContainer)`
	margin-top: 140px;
	background: url(${banner}) no-repeat;
	width: 100%;
	height: 300px;
	background-size: cover;
	background-position: center center;
`;
