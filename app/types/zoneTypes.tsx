interface ZoneProps {
  id: number;
  farmId: number;
  farmZoneNumber: number;
  zoneName: string;
  length: number;
  width: number;
  mapX: number;
  mapY: number;
  indoor: boolean;
  covered: boolean;
  insertedAt: string;
  updateAt: string;
  active: boolean;
  zoneIcons?: ZoneIconProps;
}

interface ZoneIconProps {
  dayChoreNumber?: number;
  lateChoreNumber?: number;
  dayHarvestNumber?: number;
  lateHarvestNumber?: number;
  emptyRowNumber?: number;
}

export {ZoneProps, ZoneIconProps};
