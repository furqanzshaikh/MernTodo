import React, { useState } from 'react';
import './createtodo.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const createTodo = async (e) => {
        e.preventDefault();
        console.log(title, description, category)
        try {
            const response = await axios.post('http://localhost:3000/todos/create', {
                title,
                description,
                category
            });
            console.log('Todo Created:', title, description);

            if (response.status === 201) {
                alert('Added successfully');
                navigate('/');
            } else {
                throw new Error('Failed to add todo');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add todo');
        }
    };

    return (
        <div className="todo-card">
            <form onSubmit={createTodo}>
                <div className="input-field">
                    <h3 className="label">Title:</h3>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-field">
                    <h3 className="label">Description:</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <h3 >Category</h3>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <button type="submit" className="button add-button">Add</button>
                    <Link to={'/'}>
                        <button type="button" className="button cancel-button">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateTodo;
