import React from 'react';

import classnames from 'classnames';

import './index.scss';

interface ButtonProps {
  icon?: string;
}

function Button(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { icon, className, children } = props;
  return (
    <button
      {...props}
      className={classnames('button-comp', {
        [className]: className,
        icon,
      })}
    >
      {children}
    </button>
  );
}

export default Button;
