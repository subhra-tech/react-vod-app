import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../Home";
import History from "../History";
import { AppBar, Toolbar, withStyles, IconButton } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home'
import HistoryIcon from '@material-ui/icons/History'

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    marginBottom: 10
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

function App({ classes }) {
  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Link to={`${process.env.PUBLIC_URL}/`} className={classes.menuButton}>
             <IconButton>
               <HomeIcon />
             </IconButton>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/history/`} className={classes.menuButton}>
             <IconButton>
               <HistoryIcon />
             </IconButton>
            </Link>
          </Toolbar>
        </AppBar>

        <Route path="/" exact component={Home} />
        <Route path="/history/" component={History} />
      </div>
    </Router>
  );
}

export default withStyles(styles)(App);