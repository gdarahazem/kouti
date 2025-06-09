export interface ChartData {
  label: string;
  value: number;
  color: string;
}

export interface AlertData {
  type: string;
  count: number;
  color: string;
}

export interface SummaryData {
  label: string;
  value: number;
  barColor: string;
}

export interface DashboardCard {
  title: string;
  data: ChartData[];
  type: 'donut' | 'bar' | 'status' | 'summary';
  alerts?: AlertData[];
  summary?: SummaryData[];
}
