import { useCallback, useState } from 'react';
import _ from 'lodash';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Column';
import './App.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  const [state, setState] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);
  const onDragEnd = ({ destination, source, draggableId }) => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';
    setHomeIndex(null);
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];
    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };
      setState({...state, columns: { ...state.columns, [newColumn.id]: newColumn }});
    } else {
      // Moving from one column to another
      const startTaskIds = [...startColumn.taskIds];
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = [...finishColumn.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      });
    }
  };

  const onDragStart = (start) => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease';
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(homeIndex);
  };

  const onDragUpdate = ({ destination }) => {
    const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Container>
        {
          _.map(state.columnOrder, (columnId, index) => {
            const column = state.columns[columnId];
            const tasks = _.map(column.taskIds, (taskId) => state.tasks[taskId]);
            const isDropDisabled = index < homeIndex;
            return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
          })
        }
      </Container>
    </DragDropContext>
  );
}

export default App;
