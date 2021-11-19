import React, { useState } from "react";
import PropTypes from "prop-types";

const ListItem = props => {
	return (
		<li
			// key={props.key}
			className="list-group-item task"
			onClick={props.deleteTasks}>
			{props.task.label}
			<i className="fas fa-times close-task"></i>
		</li>
	);
};

export default ListItem;

ListItem.propTypes = {
	// key: PropTypes.number,
	task: PropTypes.object,
	deleteTasks: PropTypes.func
};
