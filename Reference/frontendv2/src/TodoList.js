import { useLoaderData, Link } from "react-router-dom";

// loader function
async function loadTodos(request) {
    // get proj id
    const projectId = request.params.projectId;
    // Fetch project details for proj name
    const projectResponse = await fetch(`http://localhost:3001/project/${projectId}`);
    const projectData = await projectResponse.json();
    // Fetch all todos for the project
    const todosResponse = await fetch(`http://localhost:3001/project/${projectId}/todo/`);
    const todosData = await todosResponse.json();
    return { project: projectData, todos: todosData };
}

export default function TodoList() {
    // set loader func
    const {project, todos} = useLoaderData();

    console.log(todos);

    return (
        <>
            <h2>List of Todos for {project.name}</h2>
            <h3>
                <Link to={`/project/${project._id}/todo/new/`}>Create New Todo</Link>
            </h3>
            {/* make article for each project */}
            <div className='flex-container'>
                {todos.map((item) => (
                    <article className='todo' key={item._id}>
                        <Link to={`/project/${item.project_id}/todo/${item._id}`}>
                            <h3>{item.name}</h3>
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
}

export { loadTodos };