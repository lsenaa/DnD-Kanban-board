import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import "./Styles.css";

const TodoList = ({
  todos,
  setTodos,
  doingTodos,
  setDoingTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="todo-columns">
      <div className="column">
        <h3>Todo</h3>
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`droppable-col ${
                snapshot.isDraggingOver && "dragging"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="column">
        <h3>In Progress</h3>
        <Droppable droppableId="InProgress">
          {(provided, snapshot) => (
            <div
              className={`droppable-col ${
                snapshot.isDraggingOver && "dragging"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {doingTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={doingTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setDoingTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="column">
        <h3>Done</h3>
        <Droppable droppableId="TodosDone">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`droppable-col ${
                snapshot.isDraggingOver && "dragging"
              }`}
            >
              {completedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={completedTodos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
