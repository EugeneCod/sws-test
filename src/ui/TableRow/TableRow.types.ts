import { FullRowData } from '@/types/api';

export interface TableRowProps {
  level: number;
  rowData: FullRowData;
  parentId: null | number;
}
