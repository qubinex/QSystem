import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

function ButtonSave(props) {
  const { isSaving, onClick, type, size, color, text, iconInButton, className, disabled } = props;
  const saving = isSaving ? <i className="fa fa-cog fa-spin fa-fw" /> : '';
  const btnText = isSaving ? 'Progressing' : text;

  return (
    <Button
      type={type}
      size={size}
      color={color}
      disabled={isSaving || disabled}
      className={className}
      onClick={(e) => { onClick(e); }}
    >
      { iconInButton !== '' ? <i className={iconInButton} /> : '' }
      { saving }
      { btnText }
    </Button>
  );
}

ButtonSave.propTypes = {
  isSaving: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  iconInButton: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonSave.defaultProps = {
  isSaving: false,
  onClick: () => {},
  type: 'button',
  size: 'xs',
  color: 'primary',
  text: 'Sample button',
  iconInButton: '',
  className: '',
  disabled: false,
};

export default ButtonSave;
