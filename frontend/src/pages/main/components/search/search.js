import { Icon, Input } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPrase}
				placeholder="поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Seacrh = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 362px;
	height: 40px;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 3px;
	}
`;

Seacrh.propTypes = {
	searchPrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
