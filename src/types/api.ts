export interface RowData {
  equipmentCosts: number; // Оборудование
  estimatedProfit: number; // Сметная прибыль
  id: number;
  overheads: number; // Накладные расходы
  rowName: string; // Наименование работ
  salary: number; // Основная з/п
  child: RowData[];

  total: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
}
