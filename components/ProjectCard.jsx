"use client"

import { useState } from 'react'

const ProjectCard = ({ project }) => {

  let title;
  let technologies;
  let frontend;
  let backend;
  let databases;
  let infra; 

  if(project.Project.Title){
    title = project.Project.Title
  }
  else{
    title = "-"
  }

  if(project.Project.Technologies){
    technologies = project.Project.Technologies
  }
  else{
    technologies = "-"
  }

  if(project.Technical_Skillset.Frontend){
    frontend = project.Technical_Skillset.Frontend
  }
  else{
    frontend = "-"
  }

  if(project.Technical_Skillset.Backend){
    backend = project.Technical_Skillset.Backend
  }
  else{
    backend = "-"
  }

  if(project.Technical_Skillset.Databases){
    databases = project.Technical_Skillset.Databases
  }
  else{
    databases = "-"
  }

  if(project.Technical_Skillset.Infrastructure){
    infra = project.Technical_Skillset.Infrastructure
  }
  else{
    infra = "-"
  }
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const expandedTile = `fixed top-1/2 left-1/2 backdrop-blur-xl rounded-lg -translate-x-1/2 -translate-y-1/2 bg-opacity-80 bg-amber-200 p-6 text-black z-50 flex flex-col items-center justify-center w-100 h-70 ${isExpanded ? 'block shadow-md focus:shadow-lg' : 'hidden'}`;

  
  return (
    <div className="relative">
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
        ></div>
      )}
      <div
        className={expandedTile}
      >
        <div className="flex flex-col py-1">
          <p><b>Title:</b> {title}</p>
          <p><b>Technologies:</b> {technologies}</p>
          <p><b>Frontend:</b> {frontend}</p>
          <p><b>Backend:</b> {backend}</p>
          <p><b>Databases:</b> {databases}</p>
          <p><b>Infrastructure:</b> {infra}</p>
        </div>
        {isExpanded && (
          <button
            className="absolute top-2 right-2 bg-transparent text-black text-xl"
            onClick={toggleExpand}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        className={`project_card ${isExpanded ? 'hidden' : 'block'}`}
        onClick={toggleExpand}
      >
        <div className="flex flex-col py-1">
          <p><b>Title:</b> {title}</p>
          <p><b>Technologies:</b> {technologies}</p>
          <p><b>Frontend:</b> {frontend}</p>
          <p><b>Backend:</b> {backend}</p>
          <p><b>Databases:</b> {databases}</p>
          <p><b>Infrastructure:</b> {infra}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard