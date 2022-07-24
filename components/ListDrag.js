import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import Link from 'next/link';

const itemsFromBackend = [
  {
    name: 'SHOP',
    icon: 'fa fa-shopping-bag',
    position: 0,
    id: '01iif'
  },
  {
    name: 'SHOP NFTs',
    icon: 'fa fa-connectdevelop',
    position: 1,
    id: '0qieiririr'
  },
  {
    name: 'Play',
    icon: 'fa fa-fast-forward',
    position: 2,
    id: '02jfj2j'
  }
];

const columnsFromBackend = {
  '1230193': {
    name: 'Requested',
    items: []
  },
  '00001': {
    name: 'To do',
    items: itemsFromBackend
  }
};

console.log(columnsFromBackend);
const onDragEnd = (result, columns, setColumns) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function ListDrag() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  console.log(columns['00001'].items.length);
  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}
      >
        {process.browser && (
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                  key={columnId}
                >
                  <div style={{ margin: 8 }}>
                    {click === true && columnId === '00001' ? null : (
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? 'lightblue'
                                  : 'lightgrey',
                                padding: 4,
                                width: 100,
                                minHeight: 50
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: 'none',
                                            padding: 16,
                                            margin: '0 0 8px 0',
                                            minHeight: '50px',
                                            backgroundColor: snapshot.isDragging
                                              ? '#263B4A'
                                              : '#456C86',
                                            color: 'white',
                                            ...provided.draggableProps.style
                                          }}
                                        >
                                          <li>
                                            <Link href="/discover">
                                              <a className="">
                                                <span className="iconbg">
                                                  <i
                                                    className={item.icon}
                                                    aria-hidden="true"
                                                  ></i>
                                                </span>{' '}
                                                <span className="title">
                                                  {item.name}
                                                </span>
                                              </a>
                                            </Link>{' '}
                                          </li>
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
                    )}
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        )}
      </div>
      <button className="btn" onClick={() => handleClick()}>
        <a href="#">
          {' '}
          <span className="iconbg sub">
            {columns['1230193'].items.length === 3 ? (
              <i class="fa fa-minus" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-plus" aria-hidden="true"></i>
            )}
          </span>
        </a>
      </button>
    </>
  );
}

export default ListDrag;
