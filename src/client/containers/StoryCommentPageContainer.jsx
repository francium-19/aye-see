import React, { Component } from 'react';
import StoryHeader from '../components/StoryHeader.jsx';
import CommentFeed from '../components/CommentFeed.jsx';
import CreateComment from '../components/CreateComment.jsx';

export default class StoryCommentPageContainer extends Component{

  constructor(props){
    super();
    this.state = {
      comments: [],
      post: null,
      post_id: parseInt(props.match.params.post_id)
    }
  }

  componentDidMount(){
    fetch(`/post/${this.state.post_id}/comments`)
      .then(res => res.json())
      .then(data => {
        this.setState({ comments: data })
      });

    console.log(this.state.post_id)
    fetch(`/post/${this.state.post_id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({post:data})
      })
  }

  render(){
    return (
      <div>
        { (this.state.post && this.state.comments) &&
          <div>
            <StoryHeader post = {this.state.post}/>
              <CommentFeed comments={this.state.comments}/>
                <CreateComment dataInject={{user_id:11,post_id:this.state.post_id}}/>
          </div>
        }
      </div>
    )
  } 
   


}


