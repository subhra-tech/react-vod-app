import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CarouselItem from './CarouselItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  fullCarousel: {
    justifyContent: 'space-evenly'
  },
  semiCarousel: {
    justifyContent: 'center'
  },
  deviceRoot: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      '&:focus': {
        outline: 'none'
      },
    },
  },
  button: {
    fontSize: 40,
    color: '#888'
  },
  carouselBtn: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

class Carousel extends React.Component {
  state = {
    startIndex: 0,
    stepSize: 5,
    displayEntries: [...this.props.entries]
  }
  
  carouselRef = React.createRef();

  componentDidMount() {
    this.carouselRef.current.focus()
  }

  componentDidUpdate() {
    this.carouselRef.current.focus()
  }

  handleNext = () => {
    this.setState(prevState => {
      const displayEntries = [...prevState.displayEntries]
      const entry = displayEntries.shift()
      return {
        displayEntries: [...displayEntries, entry]
      }
    })
  }

  handleBack = () => {
    this.setState(prevState => {
      const displayEntries = [...prevState.displayEntries]
      const entry = displayEntries.pop()
      return {
        displayEntries: [entry, ...displayEntries]
      }
    })
  }

  handleKeyboardEvent = e => {
    const key = e.key
    if (key === 'ArrowRight') {
      this.handleBack()
    } else if (key === 'ArrowLeft') {
      this.handleNext()
    }
  }

  render() {
    const { classes, handleClick } = this.props
    const { startIndex, stepSize, displayEntries } = this.state
    let rootStyle = [classes.root]
    if (displayEntries.length >= stepSize) {
      rootStyle.push(classes.fullCarousel)
    } else {
      rootStyle.push(classes.semiCarousel)
    }
    return (
      <>
        <div className={rootStyle.join(' ')} ref={this.carouselRef} tabIndex={0} onKeyDown={this.handleKeyboardEvent}>
        {displayEntries.length >= stepSize && 
          <Button size="small" onClick={this.handleBack} >
            <KeyboardArrowLeft className={classes.button} />
          </Button>
        }
        {displayEntries.slice(startIndex, stepSize).map(entry => 
          <CarouselItem 
            key={entry.id} 
            entry={entry} 
            handleClick={handleClick} 
            carouselSize={displayEntries.length} 
            stepSize={stepSize}/>)
        }
        {displayEntries.length >= stepSize && 
          <Button size={'small'} onClick={this.handleNext}>
            <KeyboardArrowRight className={classes.button}/>
          </Button>}
        </div>
        <div className={classes.deviceRoot}>
          {displayEntries.map(entry => <CarouselItem  key={entry.id} entry = {entry} handleClick={handleClick}/>)}
        </div>
      </>
      )
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carousel);