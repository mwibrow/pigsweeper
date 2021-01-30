import React from 'react';

import Sprite, { SpriteName } from '../Sprite';

import './Tile.scss';

interface TileProps {
  active: boolean;
  visible: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
}

const Tile: React.FC<TileProps> = ({
  active,
  visible,
  mine,
  flagged,
  neighbors,
}) => {
  const spriteNames: SpriteName[] = [];
  if (visible) {
    if (mine) {
      spriteNames.push(SpriteName.Covered);
      spriteNames.push(SpriteName.Mine);
    } else {
      spriteNames.push(SpriteName.Empty);
    }
  } else {
    spriteNames.push(SpriteName.Covered);
  }
  if (flagged) {
    spriteNames.push(SpriteName.Flag);
  }
  return (
    <div className="tile">
      {/* <div
        className={clsx(
          'tile-image',
          `tile-image-kind-${mine ? 'mine' : 'empty'}`
        )}
      />
      <div className={clsx('tile-neighbors', `tile-neighbors-${neighbors}`)} />
      {flagged ? <div className="tile-flagged" /> : null} */}
      <div className="tile-sprite">
        <Sprite name={spriteNames} />
      </div>
      {neighbors && visible ? (
        <span className="tile-neighbors">{neighbors}</span>
      ) : null}
    </div>
  );
};

export default Tile;
