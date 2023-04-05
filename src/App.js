import React, { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [doingTodos, setDoingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const localList = localStorage.getItem("todos");
    if (localList) {
      setTodos(JSON.parse(localList));
    }
  }, [setTodos]);

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let doing = doingTodos;
    let complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "InProgress") {
      add = doing[source.index];
      doing.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "InProgress") {
      doing.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setDoingTodos(doing);
    setTodos(active);
  };

  const addItem = () => {
    if (todo) {
      let newEntry = { id: uuidv4(), todo };
      setTodos([...todos, newEntry]);
      // setTodos([...todos, { id: uuidv4(), todo }]);
      // localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("todos", JSON.stringify([...todos, newEntry]));
      setTodo("");
    }
  };

  const addEnter = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="App">
      <h1 className="title">Todo list</h1>
      <TodoInput
        todo={todo}
        setTodo={setTodo}
        addItem={addItem}
        addEnter={addEnter}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          doingTodos={doingTodos}
          setDoingTodos={setDoingTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
