import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import selectTodos from '../selectors/todos';

export const TodoSummary = ({ todoCount, allTodoCount }) => {
  const todoWord = todoCount === 1 ? 'todo' : 'todos' ;
  
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title" >Viewing <span>{todoCount}</span> {todoWord} of <span>{allTodoCount}</span> Todos.</h1>
        <div className="page-header__actions" >
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleTodos = selectTodos(state.todos, state.filters);
  const allTodos = selectTodos(state.todos, { text: '', sortBy: 'date' , startDate: 0, })

  return {
    todoCount: visibleTodos.length,
    allTodoCount: allTodos.length
  };
};

export default connect(mapStateToProps)(TodoSummary);