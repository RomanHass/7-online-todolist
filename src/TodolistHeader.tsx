import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "./EditableSpan";

type PropsType = {
  title: string
  isCollapsed: boolean
  toggleViewMode: () => void
  removeTodolist: () => void
  changeTodolistTitle: (title: string) => void
}

export const TodolistHeader = ({title, isCollapsed, removeTodolist, toggleViewMode, changeTodolistTitle }: PropsType) => {

  return (
    <h3>
      <EditableSpan title={title}
                    changeItemTitle={changeTodolistTitle}
      />
      <IconButton onClick={removeTodolist} 
                  aria-label="delete">
        <DeleteIcon  />
      </IconButton>
      <input
        type="checkbox"
        checked={isCollapsed}
        onChange={toggleViewMode}
      />
    </h3>
  );
};
