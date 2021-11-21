import React, { useState, useEffect } from "react";
import ErrorAlert from "./ErrorAlert.jsx";
import ListItem from "./ListItem.jsx";

//create your first component
const Home = () => {
	const initialState = {
		label: "",
		done: false
	};

	const [input, setInput] = useState(initialState);

	const [todoList, setTodoList] = useState([]);

	const [error, setError] = useState(false);

	// const handleKeyDown = e => {
	// 	// console.log(e.key);
	// 	if (e.key === "Enter") {
	// 		if (input.label.trim() != "") {
	// 			setTodoList([...todoList, input]);
	// 			setInput(initialState);
	// 			setError(false);
	// 		} else {
	// 			// console.log("Todos los campos son obligatorios");
	// 			setError(true);
	// 		}
	// 	}
	// };

	// const handleDeleteTask = id => {
	// 	// console.log(e);
	// 	const newTodoList = todoList.filter((task, index) => index != id);
	// 	setTodoList(newTodoList);
	// 	setError(false); //quita el alert del error cuando borro un elemento y asi no queda flotando
	// };

	const sampleURL = "https://assets.breatheco.de/apis/fake/todos/user";

	const getTasks = async () => {
		try {
			const response = await fetch(`${sampleURL}/davidch`);
			const result = await response.json();
			setTodoList(result);
		} catch (error) {
			console.log(error);
		}
	};

	const addTasks = async e => {
		try {
			if (e.key == "Enter") {
				if (input != "") {
					const response = await fetch(`${sampleURL}/davidch`, {
						method: "PUT",
						body: JSON.stringify([...todoList, input]),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						getTasks();
						setInput(initialState);
						setError(false);
					} else {
						setError(true);
					}
				}
			}
		} catch (error) {
			console.log("mori");
		}
	};

	const deleteTasks = async id => {
		const newTaskList = todoList.filter((task, index) => index != id);
		try {
			const response = await fetch(`${sampleURL}/davidch`, {
				method: "PUT",
				body: JSON.stringify(newTaskList),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				await getTasks();
				setError(false);
			}
		} catch (error) {
			console.log("mori");
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className="todo-container border p-5">
			<h1 className="display-1">{"To do's"}</h1>
			<br />
			{/* Aqui comienza el componente TodoList */}
			<form onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					placeholder="What needs to done..."
					value={input.label}
					name="label"
					className="list-group-item input-task"
					onChange={e => {
						setInput({ ...input, [e.target.name]: e.target.value });
					}}
					onKeyPress={addTasks}
				/>
			</form>
			<br />
			<ul className="list-group">
				{todoList.map((task, index) => {
					return (
						<ListItem
							key={index}
							task={task}
							deleteTasks={() => deleteTasks(index)}
						/>
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
