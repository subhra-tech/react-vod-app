import React from 'react'
import { withStyles, ButtonBase, IconButton, Typography } from '@material-ui/core';
import PlayButton from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';

const styles = theme => ({
    image: {
      position: 'relative',
      height: 340,
      width: '18%',
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          display: 'none',
        },
        '& $icon': {
          display: 'block',
        }
      },
      [theme.breakpoints.down('sm')]: {
        width: '31%',
        height: 270,
        marginTop: 14
      },
      [theme.breakpoints.down('xs')]: {
        width: '47%',
        height: 270,
        marginTop: 10
      }
    },
    imageMargin: {
      marginLeft: 5
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
    icon: {
      display: 'none',
      color: theme.palette.common.white,
      margin: theme.spacing.unit,
    },
    play: {
      fontSize: '40px'
    }
  });

const CarouselItem = ({ entry, handleClick, carouselSize, stepSize, classes }) => {
  let imageStyle = [classes.image]
  if (carouselSize < stepSize) {
    imageStyle.push(classes.imageMargin)
  }
  return (
      <ButtonBase
          focusRipple
          key={entry.id}
          className={imageStyle.join(' ')}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => handleClick(entry.id)}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${entry.images[0].url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <IconButton color="primary" className={classes.icon} component="span">
              <PlayButton className={classes.play} />
            </IconButton>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {entry.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
  )
}

export default withStyles(styles)(CarouselItem)
