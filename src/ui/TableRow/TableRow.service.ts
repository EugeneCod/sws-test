import { FullRowData } from '@/types/api';

export const emptyRowData: FullRowData = {
  equipmentCosts: 0,
  estimatedProfit: 0,
  id: null,
  overheads: 0,
  rowName: '',
  salary: 0,
  child: [],
  total: 0,
  mimExploitation: 0,
  machineOperatorSalary: 0,
  materials: 0,
  mainCosts: 0,
  supportCosts: 0,
};

export function getChildLength(rowData: FullRowData[]) {
  let count = 0;
  if (!rowData.length) return 0;

  const lastChildId = rowData[rowData.length - 1].id;

  function walkThree(rowData: FullRowData[]) {
    rowData.forEach((row) => {
      count++;
      if (lastChildId === row.id) return;
      if (row.child) {
        walkThree(row.child);
      }
    });
  }

  walkThree(rowData);

  return count;
}
