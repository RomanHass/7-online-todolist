import { ChangeEvent, useState } from "react";

type PropsType = {
  title: string
  changeItemTitle: (newTitle: string) => void
};

export const EditableSpan = ({title, changeItemTitle}: PropsType) => {
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleInputValue, setTitleInputValue] = useState<string>(title);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    changeItemTitle(titleInputValue);
    setEditMode(false);
  };

  const onChangeTaskTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(e.currentTarget.value)
  };


  return (
    editMode
      ? <input value={titleInputValue}
               onBlur={offEditMode}
               onChange={onChangeTaskTitleInput}
               autoFocus />
      : <span onDoubleClick={onEditMode}>{title}</span>
  );
};