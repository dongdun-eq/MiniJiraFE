import React, { useRef, useState, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Column from "../Column/Column";
import styles from "./Board.module.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskCard from "../TaskCard/TaskCard";
import type { ColumnType, Status } from "../../types";
import type { DetailTaskType } from "../../types/task.type";
import type { PaginatedResponse } from "../../types/api.type";
import {
  calculateNextPosition,
  getNeighborPositions,
  mapTasksToColumns,
} from "../../helpers/task.helper";
import { useTaskMutations, useTasks } from "../../hooks/task.hook";
import BoardToolBar from "../BoardToolBar/BoardToolBar";

const BOARD_QUERY_PARAMS = {};

const Board: React.FC = () => {
  const { data } = useTasks(BOARD_QUERY_PARAMS);
  const { updateTaskStatus } = useTaskMutations(BOARD_QUERY_PARAMS);
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => ["tasks", BOARD_QUERY_PARAMS], []);

  /*
   * `columns` vẫn là giá trị TÍNH RA từ cache react-query — đây là
   * nguồn sự thật DUY NHẤT cho dữ liệu đã lưu/persisted. Không có
   * useState riêng, không có 2 nguồn ghi đua nhau.
   */
  const baseColumns = useMemo<ColumnType[]>(
    () => mapTasksToColumns(data?.data ?? []),
    [data],
  );

  /*
   * THAY ĐỔI CHÍNH SO VỚI BẢN TRƯỚC:
   * `previewOverride` là state RIÊNG, CHỈ DÙNG CHO HIỂN THỊ tạm thời
   * trong lúc đang kéo (giữa dragStart và dragEnd). Nó KHÔNG ghi vào
   * cache react-query, KHÔNG phải nguồn sự thật — chỉ là "lớp phủ"
   * tạm lên baseColumns để card hiện đúng vị trí đang kéo tới.
   *
   * Khi thả tay (dragEnd), override này bị xoá NGAY (set về null) và
   * toàn bộ quyết định "task thuộc cột nào, vị trí nào" chỉ tính DUY
   * NHẤT 1 lần dựa trên dữ liệu THẬT (baseColumns), không bị nhiễu
   * bởi bất kỳ thay đổi tạm nào từ lúc dragOver.
   *
   * Đây là cách tách "preview lúc kéo" ra khỏi "commit khi thả" —
   * giải quyết race condition đã phát hiện: trước đây dragOver ghi
   * thẳng vào cache, khiến dragEnd đọc nhầm trạng thái đã bị đổi từ
   * trước, dẫn tới chọn nhầm kịch bản (reorder thay vì move-cột).
   */
  const [previewOverride, setPreviewOverride] = useState<{
    taskId: string;
    targetColumnId: Status;
    insertAt: number;
  } | null>(null);

  /*
   * columns hiển thị ra UI = baseColumns, áp thêm preview nếu đang
   * kéo. Đây CHỈ là phép biến đổi hiển thị — không đụng tới cache.
   */
  const columns = useMemo<ColumnType[]>(() => {
    if (!previewOverride) return baseColumns;

    const { taskId, targetColumnId, insertAt } = previewOverride;

    const task = baseColumns
      .flatMap((c) => c.tasks)
      .find((t) => t.id === taskId);
    if (!task) return baseColumns;

    /*
     * SỬA: tính trước "cột nguồn thật" của task, để biết đây là
     * trường hợp reorder CÙNG CỘT hay move SANG CỘT KHÁC. Code cũ
     * dùng if/else if riêng lẻ trên từng cột khi map qua — khi
     * nguồn và đích là CÙNG 1 cột, nhánh xóa task chạy trước (vì
     * điều kiện "task đang ở đây" đúng) rồi return ngay, không bao
     * giờ chạy tới nhánh chèn lại (vì đó là code riêng cho cột khác,
     * trong khi đây cùng 1 cột nên không lặp qua lại lần 2).
     */
    const sourceCol = baseColumns.find((c) =>
      c.tasks.some((t) => t.id === taskId),
    );
    const isSameColumn = sourceCol?.id === targetColumnId;

    return baseColumns.map((col) => {
      if (isSameColumn && col.id === targetColumnId) {
        // Cùng 1 cột: xóa task khỏi vị trí cũ rồi chèn lại đúng vị
        // trí mới NGAY TRONG CÙNG 1 LẦN map qua cột này — không tách
        // thành 2 nhánh riêng như trước (vốn chỉ chạy được 1 trong 2).
        const without = col.tasks.filter((t) => t.id !== taskId);
        const next = [...without];
        const clampedIndex = Math.min(insertAt, next.length);
        next.splice(clampedIndex, 0, task);
        return { ...col, tasks: next };
      }

      if (!isSameColumn && col.tasks.some((t) => t.id === taskId)) {
        // Cột nguồn (khác cột đích) — chỉ cần xóa task ra
        return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
      }

      if (!isSameColumn && col.id === targetColumnId) {
        // Cột đích (khác cột nguồn) — chèn task vào đúng vị trí
        const without = col.tasks.filter((t) => t.id !== taskId);
        const next = [...without];
        next.splice(insertAt, 0, task);
        return { ...col, tasks: next };
      }

      return col;
    });
  }, [baseColumns, previewOverride]);

  const [activeCol, setActiveCol] = useState(0);
  const [activeTask, setActiveTask] = useState<DetailTaskType | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastCall = 0;
    const handler = () => {
      const now = Date.now();
      if (now - lastCall < 100) return;
      lastCall = now;
      const colWidth = el.scrollWidth / columns.length;
      const idx = Math.round(el.scrollLeft / colWidth);
      setActiveCol(Math.min(idx, columns.length - 1));
    };

    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [columns.length]);

  // Helper tìm trong baseColumns (data THẬT) — dùng khi cần biết
  // task đang thực sự nằm ở cột nào theo server, không bị ảnh hưởng
  // bởi preview hiển thị tạm.
  const findRealColumnByTaskId = (taskId: string): ColumnType | undefined =>
    baseColumns.find((c) => c.tasks.some((t) => t.id === taskId));

  const findTask = (taskId: string): DetailTaskType | undefined =>
    baseColumns.flatMap((c) => c.tasks).find((t) => t.id === taskId);

  const handleDragStart = (event: DragStartEvent) => {
    const task = findTask(event.active.id as string);
    setActiveTask(task ?? null);
  };

  /*
   * dragOver giờ CHỈ cập nhật preview hiển thị — không ghi cache,
   * không gọi API. Mục đích duy nhất: cho người dùng thấy card
   * "nhảy" theo đúng cột/vị trí đang kéo tới, để cảm giác kéo-thả
   * vẫn mượt như trước, nhưng không còn side-effect nguy hiểm nào.
   */
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      setPreviewOverride(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    // over có thể là 1 task khác, hoặc chính 1 cột rỗng
    const overColFromTask = baseColumns.find((c) =>
      c.tasks.some((t) => t.id === overId),
    );
    const targetCol =
      overColFromTask ?? baseColumns.find((c) => c.id === overId);
    if (!targetCol) return;

    /*
     * SỬA: loại bỏ task đang được kéo (activeId) ra khỏi danh sách
     * TRƯỚC KHI tính insertAt. Nếu không loại, và task đang kéo đứng
     * trước vị trí đang hover trong mảng gốc, chỉ số tìm được sẽ bị
     * lệch 1 so với "vị trí thật sau khi đã bỏ task ra" — đây là
     * nguyên nhân gây hiệu ứng nhảy lên đầu/lệch vị trí khi kéo
     * trong cùng cột.
     */
    const tasksWithoutActive = targetCol.tasks.filter((t) => t.id !== activeId);

    const insertAt = overColFromTask
      ? tasksWithoutActive.findIndex((t) => t.id === overId)
      : tasksWithoutActive.length;

    setPreviewOverride({
      taskId: activeId,
      targetColumnId: targetCol.id,
      insertAt: insertAt >= 0 ? insertAt : tasksWithoutActive.length,
    });
  };

  /*
   * dragEnd giờ là NƠI DUY NHẤT quyết định: cột đích thật là cột
   * nào, vị trí nào, và gọi API. Toàn bộ dựa trên baseColumns (data
   * thật từ cache) + previewOverride (vị trí cuối cùng người dùng
   * thả tay) — KHÔNG đọc lại columns đã bị preview áp lên, tránh
   * đúng race condition đã phát hiện trước đây.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;

    // Luôn dọn preview khi thả tay, dù có move hay không
    const finalPreview = previewOverride;
    setPreviewOverride(null);
    setActiveTask(null);

    if (!over) return;

    const realSourceCol = findRealColumnByTaskId(activeId);
    if (!realSourceCol) return;

    // Cột đích THẬT lấy từ preview cuối cùng (nếu có), fallback về
    // chính cột nguồn nếu vì lý do gì preview bị null (vd nhả tay
    // quá nhanh, dragOver chưa kịp chạy lần nào).
    const targetColumnId = finalPreview?.targetColumnId ?? realSourceCol.id;
    const targetCol = baseColumns.find((c) => c.id === targetColumnId);
    if (!targetCol) return;

    const isSameColumn = targetColumnId === realSourceCol.id;

    if (isSameColumn) {
      // KỊCH BẢN 1: reorder trong cùng cột
      const oldIndex = realSourceCol.tasks.findIndex((t) => t.id === activeId);
      const overId = over.id as string;
      const newIndex = realSourceCol.tasks.findIndex((t) => t.id === overId);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      const reordered = arrayMove(realSourceCol.tasks, oldIndex, newIndex);
      const { prevPos, nextPos } = getNeighborPositions(reordered, newIndex);
      const newPositionStr = calculateNextPosition(prevPos, nextPos);

      // Optimistic update — ghi vào cache MỘT LẦN DUY NHẤT, dựa trên
      // dữ liệu thật, không phải dữ liệu đã bị preview làm nhiễu.
      queryClient.setQueryData(
        queryKey,
        (oldData: PaginatedResponse<DetailTaskType> | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((t) =>
              t.id === activeId ? { ...t, position: newPositionStr } : t,
            ),
          };
        },
      );

      updateTaskStatus({
        id: activeId,
        dto: { status: realSourceCol.id, position: newPositionStr },
      });
    } else {
      // KỊCH BẢN 2: đổi sang cột khác
      const insertAt = finalPreview?.insertAt ?? targetCol.tasks.length;
      const prevTask = targetCol.tasks[insertAt - 1];
      const nextTask = targetCol.tasks[insertAt];

      const newPositionStr = calculateNextPosition(
        prevTask?.position,
        nextTask?.position,
      );

      // Ghi cache MỘT LẦN DUY NHẤT tại đây — không còn dragOver nào
      // ghi đè trước đó nữa, nên không có race condition.
      queryClient.setQueryData(
        queryKey,
        (oldData: PaginatedResponse<DetailTaskType> | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((t) =>
              t.id === activeId
                ? { ...t, status: targetColumnId, position: newPositionStr }
                : t,
            ),
          };
        },
      );

      updateTaskStatus({
        id: activeId,
        dto: { status: targetColumnId, position: newPositionStr },
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      autoScroll={false}
    >
      <div className={styles.wrapper}>
        <BoardToolBar />

        <div className={styles.scroll} ref={scrollRef}>
          <div className={styles.columns}>
            {columns.map((col) => (
              <Column key={col.id} column={col} />
            ))}
          </div>
        </div>

        <div className={styles.swipeHint} aria-hidden="true">
          {columns.map((col, i) => (
            <span
              key={col.id}
              className={`${styles.swipeDot} ${i === activeCol ? styles.active : ""}`}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
