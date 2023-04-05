import React from "react";

const TodoInput = ({ todo, setTodo, addItem, addEnter }) => {
  return (
    <div className="todo-input">
      <input
        className="input"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={addEnter}
      />
      <button className="button" onClick={addItem}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
