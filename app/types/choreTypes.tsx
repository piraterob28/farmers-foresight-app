interface DailyChore {
  id: number;
  choreId: number;
  active: boolean;
  choreBatchId: number;
  completed: boolean;
  completedBy: number[];
  insertedAt: string;
  notes: string;
  recordTime: boolean;
  timeEnd: string | undefined;
  timeStart: string | undefined;
  todoDate: string;
  updatedAt: string;
  choreData?: ChoreData;
}

interface ChoreData {
  id: number;
  rowBatchId: number;
  recurring: boolean;
  recurrType?: string;
  recurrWeekDays?: string;
  startDate: string;
  insertedAt: string;
  updatedAt: string;
  active: boolean;
  assignedTo: number;
  choreTypeId: number;
  choreType?: ChoreType;
  zoneNumber: number;
  rowNumber: number;
  rowPlantInfo: string;
}

interface ChoreType {
  id: number;
  name: string;
  description: string;
  toolIds?: string;
  insertedAt: string;
  updatedAt: string;
  active: boolean;
  choreType: string;
  averageChoreTime?: string;
}

export {ChoreData, ChoreType, DailyChore};
