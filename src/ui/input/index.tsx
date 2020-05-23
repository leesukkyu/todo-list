import React from 'react';

import './index.scss';

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="input-comp" autoComplete="off" />;
}

export default Input;
