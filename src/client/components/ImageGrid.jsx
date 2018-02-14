import React, { Component } from 'react';
import { GridList , GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import HomePageContainer from './HomePageContainer.jsx';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 800,
        height: 600,
        overflowY: 'auto',
    },
};

class ImageGrid extends Component {
    constructor(props){

        super(props);
    }

    componentDidMount(){
        if (this.props.postList.length === 0) {
            console.log('Comp did mount, imagegrid');
            fetch('/posts')
            .then(res => res.json())
            .then((res) => this.props.renderPosts(res));
            // .catch((res) => )
        }
    }

    render() {

        console.log(this.props);

        let postArr = this.props.postList.map((post, index) => (
            <Link to={'/commentfeed/'+post.post_id}><GridTile
                key={index}
                title={post.title}
                post_id={post.post_id}>
                <img src={post.img} />
            </GridTile></Link>
        ))
        
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={180}
                    style={styles.gridList}>
                    <Subheader>Stories</Subheader>
                   {postArr}
                </GridList>
            </div>
        );
    }
}

export default ImageGrid;
