import React, { useState, useEffect } from 'react';

import classnames from 'classnames';

import './index.scss';

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const [isFocus, setIsFocus] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const { value, placeholder, onChange } = props;

  useEffect(() => {
    if (!isFocus && !value) {
      setIsActive(false);
    }
  }, [value]);

  return (
    <div
      className={classnames('textarea-comp', {
        active: isActive,
        focus: isFocus,
      })}
    >
      <label className="label-box">
        <span className="placeholder">{placeholder}</span>
        <textarea
          className="textarea"
          value={value}
          onFocus={() => {
            setIsActive(true);
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsActive(!!value);
            setIsFocus(false);
          }}
          onChange={onChange}
          autoComplete="off"
        />
      </label>
    </div>
  );
};

export default Textarea;
