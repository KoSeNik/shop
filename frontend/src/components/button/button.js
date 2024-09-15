import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: 1px solid #7a7a7a;
	border-radius: 10px;
	color: #515151;
	background: white;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		background: #f3f3f3;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
