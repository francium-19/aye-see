import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class CreateComment extends Component{
  constructor(props){
    super(props);
    this.state = {
      caption: '',
      photo: null
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
  }

  handleFileChange(e){
    console.log('inside file change')

    this.setState({ photo: e.target.files[0] })
  }

  handleCaption(e){
    this.setState({ caption: e.target.value });
  }

  handleSubmit(){
    console.log('handle submit')
    let formData = new FormData();
    let post_body = Object.assign({}, this.props.dataInject, this.state);

    for(let i in post_body){
      formData.append(i,post_body[i])
    }

    console.log(formData)
    fetch('/post/comment/create',{
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => { console.log(data, 'data in submitsss') })
  }
  

  //fields post_id,user_id
  render(){
    return(
      <Paper>
        <input
          type='file'
          onChange={this.handleFileChange}
          name='photo'
        />
          <TextField
            onChange={this.handleCaption}
            floatingLabelText="Caption"
          />
            <RaisedButton
              label='Submit'
              primary={true}
              onClick={this.handleSubmit}
            />
      </Paper>
    )
  }
}


