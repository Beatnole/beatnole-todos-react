import React from 'react';
import { connect } from 'react-redux'
import TodoForm from './TodoForm'
import { startAddTodo } from '../actions/todos'

export class AddTodoPage extends React.Component {
    onSubmit = (todo) => {
        this.props.startAddTodo(todo)
    }
    render() {
        return (
        <div>
            <div>
                <div className="input-group__item">
                    <h1 className="page-header__title"></h1>    
                </div>
            </div>
            <div className="content-container">
                <TodoForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        </div>
    )}
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAddTodo: (todo) => dispatch(startAddTodo(todo))
    }
}

export default connect(undefined, mapDispatchToProps)(AddTodoPage)