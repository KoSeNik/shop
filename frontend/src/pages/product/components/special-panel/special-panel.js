import { useSelector } from 'react-redux';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, editButton }) => {
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return <div className={className}>{isAdmin && <div>{editButton}</div>}</div>;
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};
`;

SpecialPanel.propTypes = {
	editButton: PropTypes.node.isRequired,
};
