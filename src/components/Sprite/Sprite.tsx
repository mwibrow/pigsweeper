import clsx from 'clsx';
import React from 'react';

import './Sprite.scss';

import { ReactComponent as Earth } from './svg/earth.svg';
import { ReactComponent as Flag } from './svg/flag.svg';
import { ReactComponent as Grass } from './svg/grass.svg';
import { ReactComponent as Pig } from './svg/pig.svg';

export enum SpriteName {
  // Happy = '🙂',
  // Sad = '😭',
  // Scared = '😨',
  Covered,
  Flag,
  Mine,
  Empty,
}

const getComponent = (name: SpriteName) => {
  switch (name) {
    case SpriteName.Covered:
      return Earth;
    case SpriteName.Flag:
      return Flag;
    case SpriteName.Empty:
      return Grass;
    case SpriteName.Mine:
      return Pig;
  }
};
interface SpriteProps {
  name: SpriteName | SpriteName[];
}

const Sprite: React.FC<SpriteProps> = ({ name }) => {
  const names = Array.isArray(name) ? name : [name];
  return (
    <div className="sprite">
      {names.map((name, index) => {
        const Component = getComponent(name);
        return (
          <span
            key={`sprite-${index}`}
            className={clsx('sprite', `sprite-name-${name}`)}
          >
            <Component className="sprite-svg" />
          </span>
        );
      })}
    </div>
  );
};

export default Sprite;