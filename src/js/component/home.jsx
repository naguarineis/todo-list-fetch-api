import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert.jsx";

//create your first component
const Home = () => {
	const [input, setInput] = useState("");

	const [todoList, setTodoList] = useState([]);

	const [error, setError] = useState(false);

	const handleKeyDown = e => {
		// console.log(e.key);
		if (e.key === "Enter") {
			if (input.trim() != "") {
				setTodoList([...todoList, input]);
				setInput("");
				setError(false);
			} else {
				// console.log("Todos los campos son obligatorios");
				setError(true);
			}
		}
	};

	const handleDeleteTask = id => {
		// console.log(e);
		const newTodoList = todoList.filter((task, index) => index != id);
		setTodoList(newTodoList);
		setError(false); //quita el alert cuando borro un elemento y asi no queda flotando
	};

	return (
		<div className="todo-container border p-5">
			<h1 className="display-1">{"To do's"}</h1>
			<br />
			{/* Aqui comienza el componente TodoList */}
			<form onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					placeholder="What needs to done..."
					value={input}
					name="text"
					className="list-group-item input-task"
					onChange={e => {
						setInput(e.target.value);
					}}
					onKeyPress={handleKeyDown}
				/>
			</form>
			<br />
			<ul className="list-group">
				{todoList.map((task, index) => {
					return (
						<li
							key={index}
							className="list-group-item task"
							onClick={() => handleDeleteTask(index)}>
							{task}
							<i className="fas fa-times close-task"></i>
						</li>
					);
				})}
			</ul>
			<br />
			<div className="remaining-items">
				{todoList.length == 0
					? `No tasks, add a task`
					: todoList.length == 1
					? `${todoList.length} item left`
					: `${todoList.length} items left`}
			</div>
			<br />
			{error && <ErrorAlert />}
		</div>
	);
};

export default Home;
