import clsx from 'clsx';
import React, { useState, MouseEvent } from 'react';

import { Grid } from './lib/Grid';
import GridComponent from './components/Grid';
import Tile from './components/Tile';
import Timer, { TimerState } from './components/Timer';
import TileEvents from './components/TileEvents';
import Sprite, { SpriteName } from './components/Sprite';
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
  const [rows] = useState<number>(10);
  const [columns] = useState<number>(10);
  const [mines] = useState<number>(20);

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
    setGuessing(false);
    setGameState(GameState.Default);
    setTimerState(TimerState.Reset);
  };

  const handleTouchStart = (i: number, j: number) => {
    setGuessing(true);
  };

  const handleTouchEnd = (i: number, j: number) => {
    setGuessing(false);
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

  const handleLongTouchEnd = (i: number, j: number) => {
    setGuessing(false);
    if (moves === 0) {
      grid.create(i, j);
    }
    grid.toggleFlag(i, j);
    setMoves(moves + 1);
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
          >
            <Sprite
              name={
                gameState === GameState.Lost
                  ? SpriteName.Sad
                  : gameState === GameState.Won
                  ? SpriteName.Happy
                  : guessing
                  ? SpriteName.Scared
                  : SpriteName.Happy
              }
            />
          </div>
          <div className="dashboard-flags">Flags: {grid.flags}</div>
        </div>
        <GridComponent
          rows={grid.rows}
          columns={grid.columns}
          cellRenderer={(i: number, j: number) => {
            const cell = grid.cellAt(i, j);

            return (
              <TileEvents
                active={active && !grid.isVisible(i, j)}
                onTouchStart={() => handleTouchStart(i, j)}
                onTouchEnd={() => handleTouchEnd(i, j)}
                onLongTouchEnd={() => handleLongTouchEnd(i, j)}
              >
                <Tile
                  active={active}
                  visible={cell.visible}
                  mine={cell.isMine()}
                  neighbors={cell.neighbors}
                  flagged={cell.flagged}
                />
              </TileEvents>
            );
          }}
        />
      </div>
    </div>
  );
}

export default App;
