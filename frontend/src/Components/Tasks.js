import React, { useState,useEffect} from 'react';
import './Tasks.css';
import 'boosted/dist/css/boosted.min.css';
function Tasks() {
    const [name, setName] = useState("");
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
      }, []);
      const fetchTasks = async () => {
        try {
          const response = await fetch('http://localhost:4000/gettask');
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
    const handleAddTask = async () => {
      try {
        const response = await fetch('http://localhost:4000/addtask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }), 
        });
  
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
  
        const data = await response.json();
        setTasks([...tasks, data]);
        setName('')
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
    const handleDeleteTask = async (taskId) => {
        try {
          const response = await fetch(`http://localhost:4000/deletetask/${taskId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete task');
          }
          const updatedTasks = tasks.filter(task => task._id !== taskId);
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };
      const handleModifyTask = async (taskId, newName) => {
        try {
          const response = await fetch(`http://localhost:4000/modifytask/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to modify task');
          }
    
          const updatedTask = await response.json();
          const updatedTasks = tasks.map(task => {
            if (task._id === updatedTask._id) {
              return updatedTask;
            }
            return task;
          });
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error modifying task:', error);
        }
      };
    
  return (
  <div>
      <h1 className='header'>Welcome to Orange Tasks Management</h1>
      <div className='input'>
      <input type="string" className="form-control input-box" placeholder='Enter Task Name' value={name} onChange={(e) => setName(e.target.value)} required/>
      <button type="button" className="btn btn-primary" onClick={handleAddTask}>Add Task</button>      
      <ul>
        {tasks.map(task => (
          <li className='list' key={task._id} >
            {task.name}
            <div>
            <button id='delete' type="button" className="btn btn-primary" onClick={() => handleDeleteTask(task._id)} >Delete</button>      
            <button id='modify' type="button" className="btn btn-primary" onClick={() => {
                const newName = prompt('Enter new name:', task.name);
                if (newName !== null) {
                  handleModifyTask(task._id, newName);
                }
              }}>Modify</button></div>
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
}
export default Tasks;