import React from "react";
import './TaskSearch.css'

function TaskSearch({searchValue, setSearchValue}){    
    
    const onSearchValueChange = (event) => {
        console.log(event.target.value)
        setSearchValue(event.target.value)
    }
    return(
        <input 
            className="TaskSearch" 
            placeholder="Search task" 
            value= {searchValue}
            onChange={onSearchValueChange}
        />
    );
}

export { TaskSearch };