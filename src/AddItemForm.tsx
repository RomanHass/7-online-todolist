import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, KeyboardEvent, useState } from "react";

type PropsType = {
  addItem: (title: string) => void
  maxItemLength: number
};

export const AddItemForm = ({addItem, maxItemLength}: PropsType) => {
  // state
  const [taskTitleInput, setTaskTitleInput] = useState<string>('');
  const [inputError, setInputError] = useState<null | string>(null);

  // local variables
  const isInputBtnDisabled = !taskTitleInput;
  const userLengthMessage = `There are ${maxItemLength - taskTitleInput.length} characters to enter `;
  const userErrorLengthMessage = taskTitleInput.length > maxItemLength;

  // callbacks
  const onClickAddItemHandler = () => {
    const trimmedTitle = taskTitleInput.trim()
    if (trimmedTitle && !isInputBtnDisabled && !userErrorLengthMessage) {
      addItem(trimmedTitle);
    } else {
      setInputError('Title is required');
    }
    setTaskTitleInput('');
  };

  const onKeyEnterDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddItemHandler();
    }
  };

  const onChangeTaskTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    inputError && setInputError(null);
    setTaskTitleInput(e.currentTarget.value);
  };

  const buttonStyle = {
    maxWidth: '38px', 
    maxHeight: '38px', 
    minWidth: '38px', 
    minHeight: '38px',
  }

  // JSX
  return (
    <div>
      <TextField error={!!inputError}
                 id="outlined-basic" 
                 label={inputError ? inputError : 'Type something'}
                 helperText={inputError}
                 variant="outlined"
                 size="small" 
                 className={inputError ? "input-error" : ""}
                 value={taskTitleInput}
                 onChange={onChangeTaskTitleInput}
                 onKeyUp={onKeyEnterDownAddItemHandler}
      />
      <Button style={buttonStyle}
              variant="contained"
              disabled={isInputBtnDisabled || userErrorLengthMessage}
              onClick={onClickAddItemHandler}
      >
        +
      </Button>

      {isInputBtnDisabled && !inputError && (
        <div>Max length task title is {maxItemLength} characters</div>
      )}
      {!isInputBtnDisabled && !userErrorLengthMessage && !inputError && (
        <div>{userLengthMessage}</div>
      )}
      {userErrorLengthMessage && (
        <div style={{ color: "red" }}>Task title is too long</div>
      )}
      {/* {inputError && <div style={{ color: "orange" }}>Title is required</div>} */}
    </div>
  );
};
