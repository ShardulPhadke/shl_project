"use client"

import { useEffect, useState } from 'react';
import ProjectCard from '@components/ProjectCard';

const ProjectList = ({ data }) => {
    return(
        <div className="mt-16 project_layout">
            {data.map((project) => (
                <ProjectCard 
                    project={project}
                />
            ))}
        </div>
    )
}

const ProjectPage = () => {

  const [allProjects, setAllProjects] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  /*
  Function to search and filter posts using a natural language query
  This function parses the search bar text which is in natural language/free-form and looks for values which are fields in 
  our data such as frontend, backend etc. Then it searches the rest of the words in the input text in that respective field.
  For Eg- if we search "Show me projects that use Angular in the frontend", it will search for other words in the search text
  in the Technical_Skillset.FrontEnd field of the data for a match. Thus it returns all the projects which have Angular in their 
  Frontend field. 
  
  Multiple field queries are also possible.
  For Eg- "show me projects with python as backend and angular as frontend", which will filter out projects which have both 
  python backend as well as angular frontend.
  */
  const filterPrompts = (searchText) => {
    let fieldPresent = false;

    const fields = ["Title", "title", "Technologies", "technologies", "Frontend", "frontend", "Backend", "backend", 
        "Databases", "databases", "Infrastructure", "infrastructure"];
    const searchWords = searchText.split(/\s+/).filter(Boolean);

    const fieldWords = searchWords.filter((word) => fields.includes(word));
    if(fieldWords.length > 0){
        fieldPresent = true;
    }
    
    const capitalizedFieldWords = fieldWords.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const excludeFieldsRegexPatterns = searchWords
    .filter((word) => !fields.includes(word)) // Filter out the fields
    .map((word) => new RegExp(`\\b${word}\\b`, "i"));

    if(fieldPresent){
        const matchingProjects = [];

        allProjects.forEach((project) => {
            let allFieldsMatch = true;

            capitalizedFieldWords.forEach((field) => {
                let fieldMatch = false;

                if (field in project.Project) {
                    const fieldValue = project.Project[field];
                    excludeFieldsRegexPatterns.forEach((regex) => {
                        if (regex.test(fieldValue)) {
                            fieldMatch = true;
                        }
                    });
                } else if (field in project.Technical_Skillset) {
                    const fieldValue = project.Technical_Skillset[field];
                    excludeFieldsRegexPatterns.forEach((regex) => {
                        if (regex.test(fieldValue)) {
                            fieldMatch = true;
                        }
                    });
                }

                if(!fieldMatch) {
                    allFieldsMatch = false;
                }
            });
            
            if(allFieldsMatch) {
                matchingProjects.push(project);
            }
        });
        return matchingProjects;
    } 
    else {
        const regexPatterns = searchWords.map((word) => new RegExp(`\\b${word}\\b`, "i"));
        return allProjects.filter((project) => {
            return regexPatterns.some((regex) => {
                return (
                    regex.test(project.Project.Title) ||
                    regex.test(project.Project.Technologies) ||
                    regex.test(project.Technical_Skillset.Frontend) ||
                    regex.test(project.Technical_Skillset.Backend) ||
                    regex.test(project.Technical_Skillset.Databases) ||
                    regex.test(project.Technical_Skillset.Infrastructure)
                );
            });
        });
    }

  };
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const getProjects = async (e) => {
    const response = await fetch("/api/getProjects");
    const data = await response.json();

    setAllProjects(data);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <section className="feed">
        <form className="relative w-full flex-center">
            <input 
                type="text"
                placeholder="Search for projects"
                value={searchText}
                onChange={handleSearchChange}
                required
                className="search_input peer"
            />
        </form>
        {searchText ? (
            <ProjectList 
                data={searchedResults}
            />
        ) : (
            <ProjectList 
                data={allProjects}
            />
        )}
    </section>
  )
}

export default ProjectPage;


//     const foundWords = [];
    // for (const word of searchWords) {
    //     if (fields.includes(word)) {
    //         foundWords.push(word);
    //         fieldPresent = true;
    //     }
    // }