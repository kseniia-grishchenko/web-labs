import React from "react";
import './task.css';
import { FiEdit } from 'react-icons/fi';
import { ImBin } from 'react-icons/im';

const Task = ({name, index, handleEdit, handleDelete}) => {
  
  return (
    <div className='task'>
      <div>{name}</div>
      <div id='actions'>
        <FiEdit onClick={() => handleEdit(index, name)}/>
        <ImBin onClick={() => handleDelete(index)}/>
      </div>
    </div>
  )
}

export default Task;
