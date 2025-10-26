import React, { useState, useRef, useLayoutEffect } from 'react';

const AutoResizingTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState(props.value);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [currentValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    props.onChange?.(e);
  };

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={currentValue}
      onChange={handleChange}
      rows={1}
    />
  );
};

export default AutoResizingTextarea;