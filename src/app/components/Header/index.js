import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  header: {
    fontSize: 20,
    marginRight: 1
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

function Header(props) {
  const { classes, label } = props;
  return (
    <div className={classes.content}>
      <p className={classes.header}>
        {label}
      </p>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);