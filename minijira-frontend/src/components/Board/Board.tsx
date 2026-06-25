import React, { useMemo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import Column from "../Column/Column";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./Board.module.css";
import type { ColumnType } from "../../types";
import type { DetailTaskType } from "../../types/task.type";
import {
  calculateNextPosition,
  mapTasksToColumns,
} from "../../helpers/task.helper";
import { useTaskMutations, useTasks } from "../../hooks/task.hook";
import BoardToolBar from "../BoardToolBar/BoardToolBar";
import { useTaskModalContext } from "../../hooks/useTaskModalContext";
import useTaskFilters from "../../hooks/useTaskFilters";
import TaskCardSkeleton from "../TaskCard/TaskCardSkeleton";
import ColumnSkeleton from "../Column/ColumnSkeleton";

const Board: React.FC = () => {
  const { params } = useTaskFilters();

  const { data, isLoading } = useTasks(params);
  const { updateTaskStatus } = useTaskMutations(params);

  const { openEdit } = useTaskModalContext();

  const columns = useMemo<ColumnType[]>(
    () => mapTasksToColumns(data?.data ?? []),
    [data],
  );

  const handleCardClick = (task: DetailTaskType) => {
    console.log(task);
    openEdit({
      id: task.id,
      assigneeId: task.assignee?.id,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      title: task.title,
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceCol = columns.find((c) => c.id === source.droppableId);
    const destCol = columns.find((c) => c.id === destination.droppableId);
    if (!sourceCol || !destCol) return;

    const isSameColumn = source.droppableId === destination.droppableId;
    const destTasksWithoutDragged = isSameColumn
      ? sourceCol.tasks.filter((t) => t.id !== draggableId)
      : destCol.tasks;

    const prevTask = destTasksWithoutDragged[destination.index - 1];
    const nextTask = destTasksWithoutDragged[destination.index];
    const newPositionStr = calculateNextPosition(
      prevTask?.position,
      nextTask?.position,
    );

    updateTaskStatus({
      id: draggableId,
      dto: { status: destCol.id, position: newPositionStr },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.wrapper}>
        <BoardToolBar />

        <div className={styles.scroll}>
          <div className={styles.columns}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, colIdx) => (
                  <ColumnSkeleton key={colIdx}>
                    <>
                      <TaskCardSkeleton />
                      <TaskCardSkeleton />
                      <TaskCardSkeleton />
                    </>
                  </ColumnSkeleton>
                ))
              : columns.map((col) => (
                  <Droppable key={col.id} droppableId={col.id}>
                    {(provided, snapshot) => (
                      <Column
                        column={col}
                        droppableRef={provided.innerRef}
                        droppableProps={provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        placeholder={provided.placeholder}
                      >
                        {col.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(dragProvided, dragSnapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                tabIndex={-1}
                                className={
                                  dragSnapshot.isDragging ? styles.dragging : ""
                                }
                              >
                                <TaskCard
                                  task={task}
                                  onClick={() => handleCardClick(task)}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </Column>
                    )}
                  </Droppable>
                ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
