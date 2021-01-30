import clsx from 'clsx';
import React from 'react';

import './Sprite.scss';

export enum SpriteName {
  Happy = 'happy',
  Sad = 'sad',
  Scared = 'scared',
  Covered = 'covered',
  Flag = 'flag',
  Mine = 'mine',
  Empty = 'empty',
}

const spriteMap = {
  [SpriteName.Happy]: '🙂',
  [SpriteName.Sad]: '😭',
  [SpriteName.Scared]: '😨',
  [SpriteName.Covered]: '🟫',
  [SpriteName.Flag]: '🚩',
  [SpriteName.Mine]: '🐷',
  [SpriteName.Empty]: '🟩',
};

interface SpriteProps {
  name?: SpriteName | SpriteName[];
}

const Sprite: React.FC<SpriteProps> = ({ name }) => {
  const names = Array.isArray(name) ? name : [name];
  return (
    <div className="sprite">
      {names.map((name, index) => (
        <div
          key={`sprite-${index}`}
          className={clsx('sprite-image', `sprite-image-${name}`)}
        >
          {spriteMap[name as SpriteName]}
        </div>
      ))}
    </div>
  );
};

export default Sprite;
