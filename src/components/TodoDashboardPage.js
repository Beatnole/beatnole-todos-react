import React from 'react';
import TodoList from './TodoList'
import TodoListFilters from './TodoListFilters'
import TodoSummary from './TodoSummary'
import AddTodo from './AddTodoPage'

const TodoDashboardPage = () => (
    <div>
        <TodoSummary />
        <TodoListFilters />
        <TodoList />
        <AddTodo />
    </div>
)

export default TodoDashboardPage