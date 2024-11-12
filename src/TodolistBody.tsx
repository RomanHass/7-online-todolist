import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { TaskType } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";

type PropsType = {
  tasks: Array<TaskType>
  filter: FilterValuesType
  todolistId: string
  addTask: (todolistId: string, newTitle: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, newStatus: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
};

export const TodolistBody = ({tasks, todolistId, filter, addTask, removeTask, changeTaskStatus, changeTaskTitle, changeTodolistFilter}: PropsType) => {

  // callbacks
  const setFilterHandlerCreator = (value: FilterValuesType) => changeTodolistFilter(todolistId, value)
  
  const tasksList = tasks.map(task => {

    const removeTaskHandler = () => removeTask(todolistId, task.id);

    const onChangeTaskTaskStatusHander = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked);

    const setTaskNewTitle = (title: string) => changeTaskTitle(todolistId, task.id, title)
    
    return (
      <ListItem sx={getListItemSx(task.isDone)}
                key={task.id}
        >
        <div>
          <Checkbox checked={task.isDone} 
                    onChange={onChangeTaskTaskStatusHander}
          />
          <EditableSpan title={task.title}
                        changeItemTitle={setTaskNewTitle}
          />
        </div>
        <IconButton onClick={removeTaskHandler} 
                    aria-label="delete">
          <DeleteIcon  />
        </IconButton>
      </ListItem>
    );
  });
  
  const addNewTask = (title: string) => {
    addTask(todolistId, title);
  };

  //  JSX
  return (
    <div>
      <AddItemForm addItem={addNewTask}
                   maxItemLength={10}
      />
      <List>{tasksList}</List>
      <Box sx={filterButtonsContainerSx}>
        <Button variant={filter === 'all' ? "outlined" : 'contained'} 
                color="success"
                onClick={() => setFilterHandlerCreator('all')}
        >
          All
        </Button>

        <Button variant={filter === 'active' ? "outlined" : 'contained'} 
                color="error"
                onClick={() => setFilterHandlerCreator('active')}
        >
          Active
        </Button>

        <Button variant={filter === 'completed' ? "outlined" : 'contained'} 
                color="secondary"
                onClick={() => setFilterHandlerCreator('completed')}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
