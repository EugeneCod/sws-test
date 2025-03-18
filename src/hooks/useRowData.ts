import { useState, useCallback } from 'react';
import { BaseRowData, FullRowData } from '@/types/api';

export function useRowData(rowData: FullRowData) {
  const initialValues = {
    rowName: rowData.rowName,
    salary: rowData.salary,
    equipmentCosts: rowData.equipmentCosts,
    overheads: rowData.overheads,
    estimatedProfit: rowData.estimatedProfit,
  };

  const [values, setValues] = useState(initialValues);

  const resetValues = useCallback(() => {
    setValues({
      rowName: rowData.rowName,
      salary: rowData.salary,
      equipmentCosts: rowData.equipmentCosts,
      overheads: rowData.overheads,
      estimatedProfit: rowData.estimatedProfit,
    });
  }, [
    rowData.equipmentCosts,
    rowData.estimatedProfit,
    rowData.overheads,
    rowData.rowName,
    rowData.salary,
  ]);

  const getCurrentValues = useCallback((): BaseRowData => {
    return {
      ...values,
      total: 0,
      mimExploitation: 0,
      machineOperatorSalary: 0,
      materials: 0,
      mainCosts: 0,
      supportCosts: 0,
    };
  }, [values]);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    type: 'string' | 'number',
  ) => {
    const { name, value } = evt.target;

    const preparedValue = type === 'number' ? parseInt(value) || 0 : value;
    setValues({ ...values, [name]: preparedValue });
  };

  return {
    values,
    handleChange,
    resetValues,
    getCurrentValues,
  };
}
