import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import moment from 'moment'
import { startRemoveTodo } from '../actions/todos'

export class TodoListItem extends React.Component {
    onClick = () => {
        this.props.startRemoveTodo({ id: this.props.todo.id })
    }
    render() {
        return (
            <div className="list-item">
                <Link className="list-item_link" to={`/edit/${this.props.id}`}>  
                    <div>
                        <h3 className="list-item__title">{this.props.todo.description}</h3>
                        <span className="list-item__sub-title">{' ' + moment(this.props.todo.createdAt).format('MMMM Do, YYYY')}</span>
                    </div>    
                </Link>
                <button className="button button--secondary" onClick={this.onClick}
                    >Remove Todo</button>
            </div>
        )
}
}

const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.find((todo) => todo.id === props.id)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startRemoveTodo: (id) => dispatch(startRemoveTodo(id))
    }
}
    
    export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)

//export default connect()(TodoListItem)

