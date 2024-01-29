import React, { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [doingTodos, setDoingTodos] = useLocalStorage("doingTodos", []);
  const [completedTodos, setCompletedTodos] = useLocalStorage(
    "completedTodos",
    []
  );

  useEffect(() => {
    // 이전에 저장된 로컬 스토리지가 없다면 초기값을 설정
    if (!localStorage.getItem("todos")) {
      setTodos([]);
    }
    if (!localStorage.getItem("doingTodos")) {
      setDoingTodos([]);
    }
    if (!localStorage.getItem("completedTodos")) {
      setCompletedTodos([]);
    }
  }, [setTodos, setDoingTodos, setCompletedTodos]);

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
      const newEntry = { id: uuidv4(), todo };
      setTodos([...todos, newEntry]);
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
      <h1 className="title">Manage your projects!</h1>
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
