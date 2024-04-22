import React from 'react';
import { useLoaderData } from 'react-router-dom';

// loader func for single todo
async function loadTodoDetail(request) {
    // get todo from id
    const todoId = request.params.todoId;
    const projectId = request.params.projectId;
    const response = await fetch(`http://localhost:3001/project/${projectId}/todo/${todoId}`);
    return await response.json();
}

export default function TodoDetail() {
    // set loader func
    const todo = useLoaderData();

    return (
        <div className='todo-id'>
            <h2>Todo {todo.name}</h2>
            <p>Description: {todo.description}</p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
        </div>
    );
}

export { loadTodoDetail };
