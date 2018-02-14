import React, { Component } from 'react';
import ImageGrid from '../components/ImageGrid.jsx';
import NavBar from '../components/NavBar.jsx';
import PostCreator from '../components/PostCreator.jsx';

class HomePageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.postList = [];

        this.renderPosts = this.renderPosts.bind(this);
        this.submitPost = this.submitPost.bind(this);
    };

    renderPosts(data) {
      const stateCopy = {};
      stateCopy.postList = data;
      this.setState({ postList: stateCopy.postList });
    }

    submitPost(data){
      fetch('/post/create', {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then((res) => this.renderPosts(res));
    }

    render() {
      return (
        <div>
          <NavBar />
          <ImageGrid
            postList={this.state.postList}
            renderPosts={this.renderPosts}
          />
          <PostCreator
            submitPost={this.submitPost}
          />
        </div>
      );
    }
}

export default HomePageContainer;