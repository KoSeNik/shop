import styled, { keyframes } from 'styled-components';

const spin = keyframes`{
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}`;

export const Loader = styled.div`
	border: 8px solid #2e5f3c;
	border-top: 8px solid #c3e4a4;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: ${spin} 2s linear infinite;
	margin: auto;
	margin-top: 80px;
`;
