import React, { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import type { ListResponse } from "../../types/api.type";

const BOARD_QUERY_PARAMS = {};

/*
 * HƯỚNG 1 — bỏ cuộn dọc riêng từng cột, để cả trang/board cuộn dọc
 * khi cần. .scroll vẫn cuộn NGANG bình thường bằng overflow-x: auto
 * (cách cuộn chuẩn của browser, không cần JS tự viết) — và vì
 * .taskList không còn overflow-y riêng nữa, không còn 2 lớp scroll
 * lồng nhau quanh Droppable -> hết cảnh báo "nested scroll container".
 *
 * Đánh đổi: 1 cột có rất nhiều task sẽ kéo dài cột đó ra, không tự
 * cuộn riêng nữa — chiều cao các cột có thể không đều nhau nếu số
 * task khác nhau nhiều. Đây là lựa chọn đơn giản, ít rủi ro nhất
 * cho board 4 cột cố định như MiniJira.
 */
const Board: React.FC = () => {
  const { data } = useTasks(BOARD_QUERY_PARAMS);
  const { updateTaskStatus } = useTaskMutations(BOARD_QUERY_PARAMS);
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => ["tasks", BOARD_QUERY_PARAMS], []);

  const columns = useMemo<ColumnType[]>(
    () => mapTasksToColumns(data?.data ?? []),
    [data],
  );

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

    queryClient.setQueryData(
      queryKey,
      (oldData: ListResponse<DetailTaskType> | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((t) =>
            t.id === draggableId
              ? { ...t, status: destCol.id, position: newPositionStr }
              : t,
          ),
        };
      },
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

        {/* .scroll cuộn NGANG bình thường qua overflow-x: auto (CSS chuẩn, không cần JS) */}
        <div className={styles.scroll}>
          <div className={styles.columns}>
            {columns.map((col) => (
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
                            className={
                              dragSnapshot.isDragging ? styles.dragging : ""
                            }
                          >
                            <TaskCard task={task} />
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
