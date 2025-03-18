export type BaseRowData = {
  equipmentCosts: number; // Оборудование
  estimatedProfit: number; // Сметная прибыль
  overheads: number; // Накладные расходы
  rowName: string; // Наименование работ
  salary: number; // Основная з/п

  total: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
};

export type BaseRowDataWithId = BaseRowData & { id: number };

// Если id === null, то это локально добавленная строка
export type FullRowData = BaseRowData & {
  child: FullRowData[];
  id: number | null;
};

// Еслт id === null, то создается корневая строка
export type CreateRowDTO = BaseRowData & { parentId: number | null };

export type UpdateRowDTO = BaseRowData;

export type ChangeRowResponce = {
  current: BaseRowDataWithId;
  changed: BaseRowDataWithId[];
};

export type DeleteRowResponce = {
  current: null;
  changed: BaseRowDataWithId[];
};
