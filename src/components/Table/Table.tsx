import { clsx } from 'clsx';
import s from './Table.module.scss';
import { TableRow } from '@/ui';
import { RowData } from '@/types/api';

const tableHeaders = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
];

const tableData: RowData[] = [
  {
    id: 116894,
    rowName: 'Южная строительная площадка',
    total: 1,
    salary: 142436,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 12250,
    overheads: 756,
    estimatedProfit: 5403854,
    child: [
      {
        id: 116895,
        rowName: 'Фундаментальные работы',
        total: 2,
        salary: 61044,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 5250,
        overheads: 324,
        estimatedProfit: 1587366,
        child: [
          {
            id: 116896,
            rowName: 'Статья работы № 1',
            total: 0,
            salary: 20348,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0,
            equipmentCosts: 1750,
            overheads: 108,
            estimatedProfit: 189122,
            child: [],
          },
          {
            id: 116897,
            rowName: 'Статья работы № 2',
            total: 0,
            salary: 20348,
            mimExploitation: 0,
            machineOperatorSalary: 0,
            materials: 0,
            mainCosts: 0,
            supportCosts: 0,
            equipmentCosts: 1750,
            overheads: 108,
            estimatedProfit: 189122,
            child: [],
          },
        ],
      },
    ],
  },
];

export const Table = (props: PropsWithClassName) => {
  const { className } = props;
  return (
    <div className={clsx(s.root, className)}>
      <div className={s['title-block']}>
        <h1 className={s.title}>Строительно-монтажные работы</h1>
      </div>
      <table className={s['table']}>

        <thead>
          <tr className={s['table-headers']}>
            {tableHeaders.map((th, idx) => (
              <th key={idx} className={s['table-header']}>
                {th}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((rowData) => (
            <TableRow
              key={rowData.id}
              level={0}
              rowData={rowData}
              tableData={tableData}
            />
          ))}
        </tbody>
        
      </table>
    </div>
  );
};
