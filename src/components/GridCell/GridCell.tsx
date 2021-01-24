import React from 'react';

import './GridCell.scss';

interface GridCellProps {
  row: number;
  column: number;
  renderer: (i: number, j: number) => any;
}

const GridCell: React.FC<GridCellProps> = ({ row, column, renderer }) => {
  return <div className="grid-cell">{renderer(row, column)}</div>;
};

export default GridCell;
