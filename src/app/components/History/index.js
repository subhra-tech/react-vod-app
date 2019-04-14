import React, { Component } from 'react';
import Loader from '../Loader';
import { sendRequest } from '../../services/api'
import Modal from '../Modal';
import { withStyles, Fab } from '@material-ui/core';
import Carousel from '../Carousel';
import Header from '../Header';
import { updateWatchedList } from '../../services/utils';
import { WATCHED_LIST_KEY } from '../../config/constants';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
    notFound: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    },
    error: {
      fontSize: 60
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
});

class Home extends Component {
  state = {
    isLoading: true,
    isError: false,
    movieData: [],
    entries: [],
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

  componentDidUpdate(_, prevState) {
    const { movieData } = this.state
    const { movieData: prevMovieData } = prevState
    // Prepare movies to be displayed based on local storage data
    if (Object.keys(movieData).length && movieData !== prevMovieData) {
      const prevWatchedEntries = JSON.parse(localStorage.getItem(WATCHED_LIST_KEY)) || []
      const { entries } = movieData
      const displayEntries = []
      prevWatchedEntries.forEach(entry => {
        const movie = entries.find(e => e.id === entry.id)
        if (movie) {
          displayEntries.push(movie)
        }
      })

      this.setState({
        entries: displayEntries
      })
    } 
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
    const { isLoading, isError, entries, currentVideoId, isOpen } = this.state
    if (isError) return <h1>Error!!</h1>
    if (isLoading) return <Loader/>
    const { classes } = this.props
    if (!entries.length) return (
      <div className={classes.notFound}>
        <Header label={'No recently watched movied found'} handleRefresh={this.loadData}/>
        <ErrorIcon className={classes.error} />
        <Fab onClick={this.refreshData} color="default" className={classes.fab}>
          <RefreshIcon className={classes.refreshIcon}/>
        </Fab>
      </div>
    )
    return (
      <div>
        <Header label={'Recently watched movies'}/>
        {!!currentVideoId && 
          <Modal 
           isOpen={isOpen} 
           onClose={this.handleClose}
           videoData={entries.find(entry => entry.id === currentVideoId)}
          />
        }
        <Carousel entries={entries} handleClick={this.handleClick}/>
        <Fab onClick={this.refreshData} color="default" className={classes.fab}>
          <RefreshIcon className={classes.refreshIcon}/>
        </Fab>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
