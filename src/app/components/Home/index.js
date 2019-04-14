import React, { Component } from 'react';
import Loader from '../Loader';
import { sendRequest } from '../../services/api'
import Modal from '../Modal';
import { withStyles, Fab } from '@material-ui/core';
import Carousel from '../Carousel';
import Header from '../Header';
import { updateWatchedList } from '../../services/utils';
import RefreshIcon from '@material-ui/icons/Refresh'

const styles = theme => ({
    card: {
      maxWidth: 230,
      margin: 10
    },
    media: {
      objectFit: 'cover',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
      backgroundColor: '#fff'
    },
    refreshIcon: {
      color: '#333'
    }
})

class Home extends Component {
  state = {
    isLoading: true,
    isError: false,
    movieData: [],
    isOpen: false,
    currentVideoId: null
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleClick = id => {
    this.setState({
      isOpen: true,
      currentVideoId: id
    }, () => {
     updateWatchedList(id)
    })
  }
  
  componentDidMount() {
    this.loadData()
  }

  loadData = async () => {
    const response = await sendRequest({ url: '/movies' })
    if (response.status === 200) {
      const movieData = await response.json()
      this.setState({
        movieData,
        isLoading: false
      })
    } else {
      this.setState({
        isError: true
      })
    }
  }

  refreshData = () => {
    this.setState({
      isLoading: true,
      movieData: []
    }, () => this.loadData())
  }

  render() {
    const { isLoading, isError, movieData, currentVideoId, isOpen } = this.state
    const { classes } = this.props
    if (isError) return <h1>Error!!</h1>
    if (isLoading) return <Loader/>
    const { entries, totalCount } = movieData
    return (
      <div>
        <Header label={'Movies'}/>
        {!!currentVideoId && 
          <Modal 
           isOpen={isOpen} 
           onClose={this.handleClose}
           videoData={entries.find(entry => entry.id === currentVideoId)}
          />
        }
        <Carousel entries={entries} totalCount={totalCount} handleClick={this.handleClick}/>
        <Fab onClick={this.refreshData} color="default" className={classes.fab}>
          <RefreshIcon className={classes.refreshIcon}/>
        </Fab>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
