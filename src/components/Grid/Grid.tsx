import React from 'react';

import GridCell from '../GridCell';

import './Grid.scss';

interface GridProps {
  rows: number;
  columns: number;
  cellRenderer: (i: number, j: number) => any;
}

const Grid: React.FC<GridProps> = ({ rows, columns, cellRenderer }) => {
  return (
    <div className="grid">
      {Array(rows)
        .fill(1)
        .map((_: any, i: number) => (
          <div key={`grid-row-${i + 1}`} className="grid-cell-row">
            {Array(columns)
              .fill(1)
              .map((_: any, j: number) => (
                <div key={`grid-column-${j + 1}`} className="grid-cell-column">
                  <GridCell row={i} column={j} renderer={cellRenderer} />
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Grid;
