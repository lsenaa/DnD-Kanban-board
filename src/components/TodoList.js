import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import "./styles.css";

const TodoList = ({ todos, setTodos, CompletedTodos, setCompletedTodos }) => {
  return (
    <div className="todo-columns">
      <div className="column">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`droppable-col ${
                snapshot.isDraggingOver && "dragging"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Todo</span>
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
        <Droppable droppableId="InProgress">
          {(provided, snapshot) => (
            <div
              className={`droppable-col ${
                snapshot.isDraggingOver && "dragging"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Todo</span>
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
        <Droppable droppableId="TodosDone">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              // className={`todos  ${
              //   snapshot.isDraggingOver ? "dragcomplete" : "remove"
              // }`}
              className={`droppable-col ${
                snapshot.isDraggingOver && "dragging"
              }`}
            >
              <span className="todos__heading">Done</span>
              {CompletedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={CompletedTodos}
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
