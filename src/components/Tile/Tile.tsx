import clsx from 'clsx';
import React from 'react';

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
  return (
    <div
      className={clsx('tile', {
        'tile-active': active,
        'tile-visible': visible,
      })}
      {...others}
    >
      <div
        className={clsx(
          'tile-image',
          `tile-image-kind-${mine ? 'mine' : 'empty'}`
        )}
      />
      <div className={clsx('tile-neighbors', `tile-neighbors-${neighbors}`)} />
      {flagged ? <div className="tile-flagged" /> : null}
    </div>
  );
};

export default Tile;
