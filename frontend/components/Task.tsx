import { useEffect, useRef, useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import Checkbox from "./common/Checkbox";
import { task } from "../types";
import { useTasks } from "../store/useTasks";
import { useDimScreen } from "../store/useDimScreen";

export default function Task({
  task,
  isTaskBeingEdited,
  index,
}: {
  task: task;
  isTaskBeingEdited: boolean;
  index: number;
}) {
  const tasksStore = useTasks((state) => state);
  const dimScreen = useDimScreen((state) => state);
  const [isComplete, setIsComplete] = useState(false);

  const inputElement = useRef<HTMLInputElement>(null);

  const toggleIsComplete = (e: any) => {
    setIsComplete(!isComplete);
    e.stopPropagation();
  };

  const startFocusAtTheEndOfTheLine = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
  };

  function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      opacity: 0,
    };
  }

  const startEditingTask = () => {
    tasksStore.startEditingTask(task.id);
    dimScreen.enableDimScreen();
    inputElement.current?.focus();
  };

  const stopEditingTask = () => {
    tasksStore.stopEditingTask();
    dimScreen.disableDimScreen();
    inputElement.current?.blur();
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Enter") stopEditingTask();
    });

    if (task.description === "") {
      startEditingTask();
    }
  }, []);

  return (
    <Draggable
      draggableId={task.id.toString()}
      index={index}
      isDragDisabled={isTaskBeingEdited}
    >
      {(provided, snapshot) => {
        return (
          <li
            className={`
            relative z-10 even:bg-card-odd odd:bg-card transition-colors
            rounded-xl
            ${
              isTaskBeingEdited
                ? "border border-solid border-primary-border"
                : "hover:bg-subtle"
            }
            `}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={`
                flex flex-row
                border border-solid border-transparent
                ${
                  isTaskBeingEdited
                    ? "border-2 items-start px-3 py-2"
                    : "items-center p-2 cursor-default"
                }`}
              onClick={() => {
                startEditingTask();
              }}
            >
              <Checkbox
                hidden={isTaskBeingEdited}
                checked={isComplete}
                onClick={(e) => {
                  toggleIsComplete(e);
                  setTimeout(() => {
                    tasksStore.removeTask(task.id);
                  }, 1000);
                }}
              />
              <input
                value={task.description}
                ref={inputElement}
                className={`
                w-full bg-transparent outline-none transition-all
                ${
                  isTaskBeingEdited
                    ? "translate-x-[-1.5rem] cursor-text"
                    : "cursor-pointer pointer-events-none"
                }
              `}
                onFocus={(e) => startFocusAtTheEndOfTheLine(e)}
                onChange={(e) => {
                  tasksStore.changeTaskDescription(task.id, e.target.value);
                }}
              />
            </div>
          </li>
        );
      }}
    </Draggable>
  );
}
