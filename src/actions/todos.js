import database from '../firebase/firebase'


export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo: todo
})

export const startAddTodo = (todoData = {}, ) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            description = '', 
            createdAt = 0
        } = todoData
        
        const todo = { description, createdAt }

        return database.ref(`users/${uid}/todos`).push(todo).then((ref) => {
            dispatch(addTodo({
                id: ref.key,
                ...todo
            }))
        })
    }
}

export const removeTodo = ({ id }) => ({
    type: 'REMOVE_TODO',
    id: id
})

export const startRemoveTodo = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/todos/${id}`).remove().then(() => {
            dispatch(removeTodo({
                id: id
            }))
        })
    }
}

export const editTodo = (id, updates) => ({
    type: 'EDIT_TODO',
    id,
    updates
})

export const startEditTodo = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/todos/${id}`).update(updates).then(() => {
             dispatch(editTodo(id, updates))
         })
    }
}

//SET_TODOS
export const setTodos = (todos) => ({
    type: 'SET_TODOS',
    todos
})


export const startSetTodos = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
      return database.ref(`users/${uid}/todos`).once('value').then((snapshot) => {
        const todos = [];
  
        snapshot.forEach((childSnapshot) => {
          todos.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setTodos(todos));
      });
    };
  };