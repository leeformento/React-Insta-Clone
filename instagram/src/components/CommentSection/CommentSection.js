import React from 'react';
import moment from 'moment';
import CommentForm from './CommentForm'
import PropTypes from 'prop-types';
import Comment from './Comment';
import './commentsection.css';


class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: this.props.post.timestamp,
            comments: this.props.post.comments,
            username: this.props.username,
            newComment: '',  
        }
    }

    changeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addNewComment = (event) => {
        event.preventDefault();
        if (this.state.newComment !== ''){
            let comments = this.state.comments;
            let commentToAdd = {
                text: this.state.newComment,
                username: this.state.username,
            }
            comments.push(commentToAdd);
            this.setState({
                comments: comments,
                newComment: ''
            })
        }
        event.target.reset();
    }

    render() {
        return (
            <div>
                <div className="comments">
                    {this.state.comments.map((comment, i) => <Comment key={i} comment={comment} username={this.state.username}/>)}
                </div>
                <p className='timestamp'>{moment(this.state.timestamp, 'MMMM Do YYYY, h:mm:ss a').fromNow()}</p>
                <CommentForm changeHandler={this.changeHandler} addNewComment={this.addNewComment}/>
            </div>
        )
    }
}

CommentSection.propTypes = {
    state: PropTypes.shape({
        timestamp: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(PropTypes.object),
      })
}

export default CommentSection;