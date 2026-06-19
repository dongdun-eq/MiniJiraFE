import type { ColumnType, Status } from "../types";
import type { DetailTaskType } from "../types/task.type";
import { toDate } from "../utils/dateUtils";

export const checkIsOverdue = (dueDateStr: string, status?: Status) => {
  if (status === "done") {
    return false;
  }

  const dueDate = toDate(dueDateStr);

  if (isNaN(dueDate.getTime())) {
    return false;
  }

  return dueDate.getTime() < Date.now();
};

export const COLUMN_TITLES: Record<Status, string> = {
  backlog: "Backlog",
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export const mapTasksToColumns = (tasks: DetailTaskType[]): ColumnType[] => {
  const columnsMap: Record<Status, ColumnType> = {
    backlog: { id: "backlog", title: COLUMN_TITLES.backlog, tasks: [] },
    todo: { id: "todo", title: COLUMN_TITLES.todo, tasks: [] },
    "in-progress": {
      id: "in-progress",
      title: COLUMN_TITLES["in-progress"],
      tasks: [],
    },
    done: { id: "done", title: COLUMN_TITLES.done, tasks: [] },
  };

  tasks.forEach((task) => {
    const column = columnsMap[task.status];
    if (column) {
      column.tasks.push(task);
    }
  });

  Object.values(columnsMap).forEach((column) => {
    column.tasks.sort((a, b) => {
      const posA = a.position ?? "";
      const posB = b.position ?? "";

      return posA.localeCompare(posB);
    });
  });

  return Object.values(columnsMap);
};

function getMiddleChar(char1: string, char2: string): string {
  const code1 = char1.charCodeAt(0);
  const code2 = char2.charCodeAt(0);
  const middleCode = Math.floor((code1 + code2) / 2);
  return String.fromCharCode(middleCode);
}

export function calculateNextPosition(
  prevPos: string | null | undefined,
  nextPos: string | null | undefined,
): string {
  const MIN_BOUND = "A";
  const MAX_BOUND = "Z";
  const DEFAULT_MID = "M";

  if (!prevPos && !nextPos) {
    return DEFAULT_MID; 
  }

  const p = prevPos || MIN_BOUND;
  const n = nextPos || MAX_BOUND;

  let i = 0;
  let result = "";

  while (true) {
    const charP = p[i] || MIN_BOUND;
    const charN = n[i] || MAX_BOUND;

    if (charP === charN) {
      result += charP;
      i++;
      continue;
    }

    if (charN.charCodeAt(0) - charP.charCodeAt(0) > 1) {
      result += getMiddleChar(charP, charN);
      break;
    }

    result += charP;

    const remainderP = p.slice(i + 1);

    if (!remainderP) {
      result += DEFAULT_MID; 
    } else {
      result += calculateNextPosition(remainderP, null);
    }
    break;
  }

  return result;
}

export const getNeighborPositions = (tasks: DetailTaskType[], index: number) => {
  const prevTask = tasks[index - 1];
  const nextTask = tasks[index + 1];

  return {
    prevPos: prevTask?.position,
    nextPos: nextTask?.position,
  };
};
