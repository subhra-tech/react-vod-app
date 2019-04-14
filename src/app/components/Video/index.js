import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';

const style = {
    video: {
        width: '100%',
        height: '100%'
    }
}

class Video extends Component {
    constructor(props) {
        super(props);
        this.video = React.createRef();
    }

    componentDidMount() {
        this.video.current.play()
    }

    componentWillUnmount() {
        this.video.current.pause()
    }

    render() {
        const { url, onEnded, classes } = this.props
        return (
            <video 
                ref={this.video} 
                className={classes.video} 
                controls 
                onEnded={onEnded}
                preload={'metadata'}>
                <source src={url} type="video/mp4"/>>
                Your browser does not support HTML5 video.
            </video>
        )
    }
}

export default withStyles(style)(Video)