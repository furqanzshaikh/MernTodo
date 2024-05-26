import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      const data = response.data.todos;
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id, newData) => {
    try {
      // Make the PUT request to update the todo item
      const response = await axios.put(`http://localhost:3000/todos/update/${id}`, newData);
      
      // Check if the response status is 200 (OK)
      if (response.status !== 200) {
        throw new Error('Failed to update todo');
      }
  
      // Update the local state with the updated todo item
      const updatedTodos = todos.map(item => item._id === id ? { ...item, ...newData } : item);
      setTodos(updatedTodos);
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Error updating todo:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/todos/delete/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete todo');
      }
      const updatedTodos = todos.filter(todo => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
  };

  const closeEditModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="hero-container">
      {todos.map((item) => (
        <div key={item._id} className="hero-card">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="button-container">
            <Link to={`/update/${item._id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
      {selectedTodo && <Modal item={selectedTodo} handleEdit={handleEdit} closeModal={closeEditModal} />}
    </div>
  );
};

export default Hero;
