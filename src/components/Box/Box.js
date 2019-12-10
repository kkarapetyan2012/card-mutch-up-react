import React from 'react';

const Box = ({ id,open,onClick, hidden }) => {

  const myClasses = {
    open: (open ? 'open' : ''),
    hidden: (hidden ? 'hidden' : '')
  }

  return (
    <div onClick={onClick} className={`${myClasses.open} ${myClasses.hidden}`}>
      <div className="rotate-block">{`${id}`}</div>
    </div>
  );
};

export default Box;