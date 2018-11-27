
 export const OLDgetTodootal = (todos) => {
    return  todos.reduce( (sum, todo) => sum + todo.amount, 0)
}




