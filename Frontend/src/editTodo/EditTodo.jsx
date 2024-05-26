import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/todos/${id}`);
                const todo = response.data.todo;
                setTitle(todo.title);
                setDescription(todo.description);
                setCategory(todo.category);
            } catch (error) {
                console.error('Error fetching todo:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching the data
            }
        };

        fetchTodo();
    }, [id]);

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/todos/update/${id}`, {
                title,
                description,
                category
            });

            if (response.status === 200) {
                alert('Updated successfully');
                navigate('/');
            } else {
                throw new Error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update todo');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Render a loading state while fetching data
    }

    return (
        <div className="todo-card">
            <form onSubmit={updateTodo}>
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
                <div className="input-field">
                    <h3 className="label">Category:</h3>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <button type="submit" className="button add-button">Update</button>
                    <Link to={'/'}>
                        <button type="button" className="button cancel-button">Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditTodo;
