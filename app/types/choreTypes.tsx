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

export {ChoreData, ChoreType};
