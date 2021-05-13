import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';
import Task from './Task';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.h3`
	padding: 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDragginOver ? 'skyblue' : 'white')};
	flex-grow: 1;
	min-height: 100px;
`;


const Column = ({ column, tasks, isDropDisabled }) => (
	<Container>
		<Title>{column.title}</Title>
		<Droppable
			droppableId={column.id}
			// type={column.id === 'column-3' ? 'done' : 'active'}
			isDropDisabled={isDropDisabled}
		>
			{(provided, snapshot) => (
				<TaskList
					ref={provided.innerRef}
					{...provided.droppableProps}
					isDragginOver={snapshot.isDraggingOver}
				>
					{_.map(tasks, (task, index) => <Task key={task.id} task={task} index={index}/>)}
					{provided.placeholder}
				</TaskList>
			)}
		</Droppable>
	</Container>
);

export default Column;
