export interface GotGrainReceipt {
  id?: number;
  region?: string;
  grainContractPlanTon?: number;
  grainPerDayTon?: number;
  grainPerDayPercent?: number;
  grainPerSeasonTon?: number;
  grainPerSeasonPercent?: number;
  seedContractPlanTon?: number;
  seedPerDayTon?: number;
  seedPerDayPercent?: number;
  seedPerSeasonTon?: number;
  seedPerSeasonPercent?: number;
  temporarilyContractPlanTon?: number;
  temporarilyPerDayTon?: number;
  temporarilyPerDayPercent?: number;
  temporarilyPerSeasonTon?: number;
  temporarilyPerSeasonPercent?: number;
  allContractPlanTon?: number;
  allPerDayTon?: number;
  allPerDayPercent?: number;
  allPerSeasonTon?: number;
  allPerSeasonPercent?: number;
  ajs?: any[];
}
