import React, { MouseEvent, TouchEvent, useState, useRef } from 'react';

interface TileEventsProps {
  chidlren?: React.ReactNode;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onLongTouchEnd: () => void;
  longTouchDuration?: number;
  active?: boolean;
}

const cancelEvent = (event: MouseEvent | TouchEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

const TileEvents: React.FC<TileEventsProps> = ({
  children,
  onTouchStart,
  onTouchEnd,
  onLongTouchEnd,
  longTouchDuration = 500,
  active,
}) => {
  const [longTouch, setLongTouch] = useState<boolean>(false);

  const timeout = useRef<undefined | number>();

  if (!active) {
    window.clearTimeout(timeout.current);
    return <div className="tile-events">{children}</div>;
  }

  const handleTouchStart = (
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>
  ) => {
    cancelEvent(event);
    onTouchStart();
    setLongTouch(false);
    timeout.current = window.setTimeout(() => {
      setLongTouch(true);
      onLongTouchEnd();
    }, longTouchDuration);
  };

  const handleTouchEnd = (
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>
  ) => {
    let rightClick = false;
    const mouseEvent = event as MouseEvent;
    if (
      mouseEvent.nativeEvent.which === 3 ||
      mouseEvent.nativeEvent.button === 2
    ) {
      rightClick = true;
    }
    cancelEvent(event);
    window.clearTimeout(timeout.current);
    if (!longTouch) {
      if (rightClick) {
        onLongTouchEnd();
      } else {
        onTouchEnd();
      }
    }
    setLongTouch(false);
  };

  return (
    <div
      className="tile-events"
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      onClick={cancelEvent}
      onContextMenu={cancelEvent}
    >
      {children}
    </div>
  );
};

export default TileEvents;
