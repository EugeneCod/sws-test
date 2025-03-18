import { FullRowData } from '@/types/api';

export interface TableDataState {
  isEditing: boolean;
  rows: FullRowData[];
}
