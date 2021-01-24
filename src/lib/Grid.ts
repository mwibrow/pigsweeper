export enum GridCellKind {
  Empty = 'empty',
  Mine = 'mine',
}

export class GridCell {
  kind: GridCellKind = GridCellKind.Empty;
  visible: boolean = false;
  flagged: boolean = false;
  neighbors: number = 0;

  setKind(kind: GridCellKind) {
    this.kind = kind;
  }

  isMine(): boolean {
    return this.kind === GridCellKind.Mine;
  }
}

export class Grid {
  cells: GridCell[][];
  rows: number;
  columns: number;
  mines: number;
  flags: number;

  constructor(rows: number, columns: number, mines: number) {
    this.rows = Math.max(rows, 2);
    this.columns = Math.max(columns, 2);
    this.mines = Math.max(Math.min(mines, this.rows * this.columns - 1), 1);
    this.flags = this.mines;
    this.cells = [];
    this.create();
  }

  create() {
    for (let i: number = 0; i < this.rows; i++) {
      this.cells.push([]);
      for (let j: number = 0; j < this.columns; j++) {
        this.cells[i].push(new GridCell());
      }
    }
    for (let k: number = this.mines; k > 0; k--) {
      const i: number = Math.floor(Math.random() * this.rows);
      const j: number = Math.floor(Math.random() * this.columns);
      if (this.isMine(i, j)) {
        k++;
      } else {
        this.cells[i][j].setKind(GridCellKind.Mine);
      }
    }
    for (let i: number = 0; i < this.rows; i++) {
      for (let j: number = 0; j < this.columns; j++) {
        if (!this.isMine(i, j)) {
          let neighbors = 0;
          [i - 1, i, i + 1].map((ii) =>
            // eslint-disable-next-line array-callback-return
            [j - 1, j, j + 1].map((jj) => {
              if (this.isMine(ii, jj)) {
                neighbors++;
              }
            })
          );
          this.cells[i][j].neighbors = neighbors;
        }
      }
    }
  }

  cellAt(i: number, j: number): GridCell {
    return this.cells[i][j];
  }

  isInGrid(i: number, j: number): boolean {
    return i >= 0 && i < this.rows && j >= 0 && j < this.columns;
  }

  isMine(i: number, j: number): boolean {
    return this.isInGrid(i, j) && this.cells[i][j].isMine();
  }

  reset() {
    for (let i: number = 0; i < this.rows; i++) {
      for (let j: number = 0; j < this.columns; j++) {
        this.cells[i][j].flagged = false;
        this.cells[i][j].visible = false;
      }
    }
  }

  restart() {
    this.create();
  }

  reveal() {
    for (let i: number = 0; i < this.rows; i++) {
      for (let j: number = 0; j < this.columns; j++) {
        if (this.isMine(i, j)) {
          this.cells[i][j].flagged = false;
          this.cells[i][j].visible = true;
        }
      }
    }
  }

  toggleFlag(i: number, j: number) {
    this.cells[i][j].flagged = !this.cells[i][j].flagged;
    if (this.cells[i][j].flagged) {
      this.flags--;
    } else {
      this.flags++;
    }
  }

  hasNeighbours(i: number, j: number): boolean {
    return Boolean(this.isInGrid(i, j) && this.cells[i][j].neighbors > 0);
  }

  makeVisible(i: number, j: number) {
    if (
      this.isInGrid(i, j) &&
      !this.cells[i][j].visible &&
      !this.cells[i][j].isMine() &&
      !this.cells[i][j].flagged
    ) {
      this.cells[i][j].visible = true;
      if (!this.hasNeighbours(i, j)) {
        this.makeVisible(i - 1, j);
        this.makeVisible(i + 1, j);
        this.makeVisible(i, j - 1);
        this.makeVisible(i, j + 1);
      }
    }
  }

  showMines() {
    for (let i: number = 0; i < this.rows; i++) {
      for (let j: number = 0; j < this.columns; j++) {
        if (this.isMine(i, j)) {
          this.cells[i][j].flagged = false;
          this.cells[i][j].visible = true;
        }
      }
    }
  }
}
