interface ZoneProps {
  zoneNumber: number;
  zoneData: ZoneDataProps;
}

interface ZoneDataProps {
  zoneType: 'outside' | 'inside';
  length: number;
  width: number;
  mapX: number;
  mapY: number;
  zoneIcons?: ZoneIconProps;
}

interface ZoneIconProps {
  dayChoreNumber?: number;
  lateChoreNumber?: number;
  dayHarvestNumber?: number;
  lateharvestNumber?: number;
  emptyrowNumber?: number;
}

export {ZoneProps, ZoneDataProps, ZoneIconProps};
