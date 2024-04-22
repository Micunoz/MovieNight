import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

// loader function for loading projects
async function loadProjects() {
    // Fetch all projects from the server
    console.log("loading projects");
    const response = await fetch('http://localhost:3001/project/');
    return await response.json();
}

// ProjectList component to display list of projects
export default function ProjectList() {
    const projects = useLoaderData();

	console.log(projects);

	return (
		<>
            <h2>List of Projects</h2>
            {/* make article for each project */}
            <div className='flex-container'>
                {projects.map((item) => (
                    <article className='project' key={item._id}>
                        <Link to={`/project/${item._id}`}>
                            <h3>{item.name}</h3>
                        </Link>
                    </article>
                ))}
            </div>
        </>
	);
}

// Export the loadProjects function for data loading
export { loadProjects };
