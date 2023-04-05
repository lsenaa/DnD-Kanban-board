import React from "react";
import { FiX } from "react-icons/fi";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo = ({ index, todo, todos, setTodos }) => {
  const deleteItem = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div className="todo-item">
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`item ${snapshot.isDragging && "dragging"}`}
          >
            {todo.todo}
            <span className="icon" onClick={() => deleteItem(todo.id)}>
              <FiX />
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
