import clsx from 'clsx';
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
  ...others
}) => {
  const spriteNames = [];
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
    <div
      className={clsx('tile', {
        'tile-active': active,
        'tile-visible': visible,
      })}
      {...others}
    >
      {/* <div
        className={clsx(
          'tile-image',
          `tile-image-kind-${mine ? 'mine' : 'empty'}`
        )}
      />
     
      {flagged ? <div className="tile-flagged" /> : null} */}
      <div className="tile-sprite">
        <Sprite name={spriteNames} />
      </div>
      {visible && neighbors ? (
        <span className="tile-neighbors">{neighbors}</span>
      ) : null}
    </div>
  );
};

export default Tile;
