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

const cancelEvent = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

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

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (playing) setGuessing(true);
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (playing) setGuessing(false);
  };

  const handleAddFlag = (i: number, j: number) => {
    if (!grid.isVisible(i, j)) {
      grid.toggleFlag(i, j);
      setMoves(moves + 1);
      setGameState(GameState.Playing);
      setTimerState(TimerState.Running);
    }
  };

  const handleSelect = (i: number, j: number) => {
    if (moves === 0) {
      grid.create(i, j);
    }
    if (grid.isMine(i, j)) {
      grid.showMines();
      setGameState(GameState.Lost);
      setTimerState(TimerState.Stopped);
    } else {
      grid.makeVisible(i, j);
      if (grid.hasWon()) {
        setGameState(GameState.Won);
        setTimerState(TimerState.Stopped);
      } else {
        setGameState(GameState.Playing);
        setTimerState(TimerState.Running);
      }
    }
    setMoves(moves + 1);
  };

  const makeClickHandler = (
    handler: (i: number, j: number) => void,
    i: number,
    j: number
  ): ((event: MouseEvent) => void) | undefined => {
    if (!active) {
      return undefined;
    }
    return (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      handler(i, j);
    };
  };

  return (
    <div className="App" onContextMenu={cancelEvent} onClick={cancelEvent}>
      <div className="heading">Pigsweeper</div>
      <div className="game">
        <div className="dashboard">
          <div className="dashboard-timer">
            <Timer state={timerState} />
          </div>
          <div
            className={clsx('dashboard-status', {
              'status-lost': gameState === GameState.Lost,
              'status-guessing': guessing,
              'status-won': gameState === GameState.Won,
            })}
            onClick={handleRestart}
          />
          <div className="dashboard-flags">Flags: {grid.flags}</div>
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
