export type Cell = {
  value: number;
  annotations: number;
  // this is derived data, but convenient to cache in each Cell
  row: number;
  column: number;
  // exclusions: number;
};
