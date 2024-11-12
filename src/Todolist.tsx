import { useState } from "react"
import { FilterValuesType } from "./App"
import { TodolistHeader } from "./TodolistHeader"
import { TodolistBody } from "./TodolistBody"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (todolistId: string, newTitle: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, newStatus: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  changeTodolistFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
};

export const Todolist = ({todolistId, title, tasks, filter, removeTask, changeTodolistFilter: changeFilter, addTask, changeTaskStatus, changeTodolistTitle, changeTaskTitle, removeTodolist}: PropsType) => {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const setTodolistNewTitle = (title: string) => changeTodolistTitle(todolistId, title)

  return (
    <div className="todolist">
      <TodolistHeader title={title}
                      isCollapsed={collapsed}
                      toggleViewMode={() => setCollapsed(!collapsed)}
                      removeTodolist={() => removeTodolist(todolistId)}
                      changeTodolistTitle={setTodolistNewTitle}
      />
      {!collapsed && <TodolistBody tasks={tasks}
                                   filter={filter}
                                   todolistId={todolistId}
                                   addTask={addTask}
                                   removeTask={removeTask}
                                   changeTaskStatus={changeTaskStatus}
                                   changeTodolistFilter={changeFilter}
                                   changeTaskTitle={changeTaskTitle}
                      />
      }
    </div> 
  );
};