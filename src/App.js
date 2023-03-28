import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const item = {
  id: uuidv4(),
  name: "Todo Title 1",
};

const item2 = {
  id: uuidv4(),
  name: "Todo Title 2",
};

function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "TODO",
      items: [item, item2],
    },
    "in-progress": {
      title: "DOING",
      items: [],
    },
    done: {
      title: "DONE",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "TODO",
          items: [
            {
              id: uuidv4(),
              name: text,
            },
            ...prev.todo.items,
          ],
        },
      };
    });
    setText("");
  };

  return (
    <div className="App">
      <div className="todo-input">
        <input
          className="input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="button" onClick={addItem}>
          Add
        </button>
      </div>
      <div className="todo-columns">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div className="column" key={key}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`droppable-col ${
                          snapshot.isDraggingOver && "dragging"
                        }`}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
