import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

// Loader function for loading project details
async function loadProjectDetail(request) {
    // get projectId from request parameters
    const projectId = request.params.projectId;
    // fetch project details from the server
    const response = await fetch(`http://localhost:3001/project/${projectId}/`);
    return await response.json();
}

// ProjectDetail component to display details of a single project
export default function ProjectDetail() {
    // Load project details using the useLoaderData hook
    const project = useLoaderData();

    return (
        <div className='project-id'>
            <h2>Project {project._id}</h2>
            <p>Name: {project.name}</p>
            <Link to={`/project/${project._id}/todo/`}>Project Todos</Link>
        </div>
    );
}

// Export the loadProjectDetail function for data loading
export { loadProjectDetail };