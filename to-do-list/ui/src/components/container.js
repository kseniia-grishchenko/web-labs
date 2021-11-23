import React, { useEffect, useState } from 'react';
import './container.css';
import { Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const CustomContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [indexOfUpdated, setIndexOfUpdated] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    const resolvedTasks = JSON.parse(localStorage.getItem('tasks'));

    setTasks(resolvedTasks)
  }, []);

  const handleValue = (evt) => {
    const newTask = evt.target.value;
    setValue(newTask);
  }

  const addTask = () => {
    if(value === '') return;
    const existingTasks = tasks ? tasks : []

    let updatedTasks = [];
    if(indexOfUpdated !== null) {
      updatedTasks = tasks;
      updatedTasks[indexOfUpdated] = value

      setIndexOfUpdated(null)
    }
    else {
      updatedTasks = [...existingTasks, value]
    }

    setTasks(updatedTasks);

    setValue('');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const onEdit = (index, value) => {
    setValue(value);
    setIndexOfUpdated(index);
  };

  const onDelete = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    localStorage.setItem('tasks', JSON.stringify(items))
    setTasks(items);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgreen" : "transparent",
    ...draggableStyle
  });

  
  return (
    <Container>
      <h2>It's my TO DO list!</h2>
      <Row>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add new task..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={handleValue}
          value={value ? value : ''}
        />
          <Button variant="outline-secondary" id="button-addon2" onClick={addTask}>
            OK
          </Button>
        </InputGroup>
      </Row>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
            {tasks?.map((task, index) => {
              return (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided, snapshot) => (
                    <Row key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                      )}
                    >
                      <Task 
                      name={task} index={index} handleEdit={onEdit} handleDelete={onDelete}/>
                    </Row>

                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </Container>
  )
}

export default CustomContainer;