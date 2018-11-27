import React from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm'
import { startEditTodo, startRemoveTodo } from '../actions/todos'

export class EditTodoPage extends React.Component {
    onSubmit = (todo) => {
        this.props.startEditTodo(this.props.todo.id, todo)
        this.props.history.push('/')
    }
    onClick = () => {
        this.props.startRemoveTodo({ id: this.props.todo.id })
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Edit Todo</h1>    
                        </div>
                    </div>
                    <div className="content-container">
                    <TodoForm
                        todo={this.props.todo}
                                onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onClick}
                    >Remove Todo</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.find((todo) => todo.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startEditTodo: (id, todo) => dispatch(startEditTodo(id, todo)),
        startRemoveTodo: (id) => dispatch(startRemoveTodo(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTodoPage)