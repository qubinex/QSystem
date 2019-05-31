import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

export default function ActiveBadge(props) {
  const { isActive } = props;
  const activeBadge = <Badge color="success">Active</Badge>;
  const inactiveBadge = <Badge color="danger">Inactive</Badge>;

  const content = isActive === 1 ? activeBadge : inactiveBadge;
  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

ActiveBadge.propTypes = { isActive: PropTypes.number };

ActiveBadge.defaultProps = { isActive: 0 };
