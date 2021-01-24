import clsx from 'clsx';
import React, { useState, MouseEvent } from 'react';

import { Grid } from './lib/Grid';
import GridComponent from './components/Grid';
import Tile from './components/Tile';
import Timer, { TimerState } from './components/Timer';

import './App.scss';

enum GameState {
  Default,
  Playing,
  Won,
  Lost,
}

function App() {
  const [rows] = useState<number>(12);
  const [columns] = useState<number>(12);
  const [mines] = useState<number>(24);

  const [grid, setGrid] = useState<Grid>(new Grid(rows, columns, mines));
  const [moves, setMoves] = useState<number>(0);

  const [gameState, setGameState] = useState<GameState>(GameState.Default);
  const [guessing, setGuessing] = useState<Boolean>(false);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.Stopped);

  const playing = gameState === GameState.Playing;
  const active = playing || gameState === GameState.Default;

  const handleRestart = () => {
    setGrid(new Grid(rows, columns, mines));
    setMoves(0);
    setGameState(GameState.Default);
    setTimerState(TimerState.Reset);
  };

  const handleMouseDown = () => {
    if (playing) setGuessing(true);
  };

  const handleMouseUp = () => {
    if (playing) setGuessing(false);
  };

  const handleAddFlag = (i: number, j: number) => {
    grid.toggleFlag(i, j);
    setMoves(moves + 1);
    setGameState(GameState.Playing);
    setTimerState(TimerState.Running);
  };

  const handleSelect = (i: number, j: number) => {
    if (grid.isMine(i, j)) {
      grid.showMines();
      setGameState(GameState.Lost);
      setTimerState(TimerState.Stopped);
    } else {
      grid.makeVisible(i, j);
      setGameState(GameState.Playing);
      setTimerState(TimerState.Running);
    }
    setMoves(moves + 1);
  };

  const makeClickHandler = (
    handler: (i: number, j: number) => void,
    i: number,
    j: number
  ): ((event: MouseEvent) => void) | undefined => {
    if (!active || grid.cells[i][j].visible) {
      return undefined;
    }
    return (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      handler(i, j);
    };
  };

  return (
    <div className="App">
      <div className="heading">Pigsweeper</div>
      <div className="game">
        <div className="game-status">
          <div className="game-status-timer">
            <Timer state={timerState} />
          </div>
          <div
            className={clsx('status', {
              'status-lost': gameState === GameState.Lost,
              'status-guessing': guessing,
            })}
            onClick={handleRestart}
          />
          <div className="game-status-flags">Flags: {grid.flags}</div>
        </div>
        <GridComponent
          rows={grid.rows}
          columns={grid.columns}
          cellRenderer={(i: number, j: number) => {
            const cell = grid.cellAt(i, j);

            return (
              <div
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={makeClickHandler(handleSelect, i, j)}
                onContextMenu={makeClickHandler(handleAddFlag, i, j)}
              >
                <Tile
                  active={active}
                  visible={cell.visible}
                  mine={cell.isMine()}
                  neighbors={cell.neighbors}
                  flagged={cell.flagged}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
