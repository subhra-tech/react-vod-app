import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Video from '../Video';
import { DialogContent } from '@material-ui/core';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, videoData, isOpen, onClose } = this.props;
    const { title, contents } = videoData
    return (
      <div>
        <Dialog
          fullScreen
          open={isOpen}
          onClose={onClose}
          TransitionComponent={Transition}
        >
        <AppBar position="static" color="default">
          <Toolbar className={classes.toolBar}>
            <Typography>{title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Video url={contents[0].url} onEnded={onClose}/>
        </DialogContent>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);