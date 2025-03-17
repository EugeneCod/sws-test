import { RowData } from '@/types/api';

export interface TableRowProps {
  level: number;
  rowData: RowData;
  tableData: RowData[];
}
