import { BaseRowDataWithId, ChangeRowResponce, FullRowData } from '@/types/api';

export function addRowRecursive(
  rows: FullRowData[],
  newRow: BaseRowDataWithId | FullRowData,
  parentId: number | null,
): FullRowData[] {
  newRow = 'child' in newRow ? newRow : { ...newRow, child: [] };
  return rows.map((row) => {
    if (row.id === parentId) {
      return {
        ...row,
        child: [...(row.child || []), newRow],
      };
    }
    if (row.child) {
      return { ...row, child: addRowRecursive(row.child, newRow, parentId) };
    }
    return row;
  });
}

export function updateRowRecursive(
  rows: FullRowData[],
  updatedRow: BaseRowDataWithId,
): FullRowData[] {
  return rows.map((row) => {
    if (updatedRow.id === row.id) {
      return { ...row, ...updatedRow };
    }
    if (row.child) {
      return { ...row, child: updateRowRecursive(row.child, updatedRow) };
    }
    return row;
  });
}

export function addRowAndUpdateRows(
  rows: FullRowData[],
  parentId: number | null,
  updatedRowsData: ChangeRowResponce,
): FullRowData[] {
  const { current, changed } = updatedRowsData;

  rows = addRowRecursive(rows, current, parentId);
  rows = deleteRowRecursive(rows, null);

  changed.forEach((updatedRow) => {
    rows = updateRowRecursive(rows, updatedRow);
  });

  return rows;
}

export function updateRows(
  rows: FullRowData[],
  updatedRowsData: ChangeRowResponce,
): FullRowData[] {
  const { current, changed } = updatedRowsData;

  rows = updateRowRecursive(rows, current);

  changed.forEach((updatedRow) => {
    rows = updateRowRecursive(rows, updatedRow);
  });

  return rows;
}

function deleteRowRecursive(rows: FullRowData[], id: number | null): FullRowData[] {
  return rows.filter((row) => {
    if (row.id === id) return false;
    if (row.child) {
      row.child = deleteRowRecursive(row.child, id);
    }
    return true;
  });
}

export function deleteRowAndUpdate(
  rows: FullRowData[],
  id: number | null,
  changed: BaseRowDataWithId[],
) {
  rows = deleteRowRecursive(rows, id);

  changed.forEach((updatedRow) => {
    rows = updateRowRecursive(rows, updatedRow);
  });

  return rows;
}
