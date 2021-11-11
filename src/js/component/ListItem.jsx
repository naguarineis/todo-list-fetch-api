import React, { useState } from "react";
import PropTypes from "prop-types";

const ListItem = props => {
	return (
		<li
			key={props.key}
			className="list-group-item task"
			onClick={props.handleDeleteTask}>
			{props.task}
			<i className="fas fa-times close-task"></i>
		</li>
	);
};

export default ListItem;

ListItem.propTypes = {
	key: PropTypes.number,
	task: PropTypes.string,
	handleDeleteTask: PropTypes.func
};
