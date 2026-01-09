import React, { useState } from 'react';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  as?: 'input' | 'textarea';
  className?: string;
  placeholder?: string;
  showCursor?: boolean;
  rows?: number;
}

const InlineEdit: React.FC<InlineEditProps> = ({ value, onSave, as = 'input', className, placeholder, showCursor = false, rows = 1 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  const cursorStyle = `
    @keyframes blink {
      50% { opacity: 0; }
    }
    .blinking-cursor {
      animation: blink 1s step-start infinite;
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background-color: currentColor;
      margin-left: 3px;
      border-radius: 2px;
    }
  `;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (isEditing && textareaRef.current && as === 'textarea') {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currentValue, isEditing, as]);

  if (isEditing) {
    const commonProps = {
      value: currentValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentValue(e.target.value),
      onBlur: handleSave,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && as !== 'textarea') {
          handleSave();
        }
        if (e.key === 'Escape') {
          setCurrentValue(value);
          setIsEditing(false);
        }
      },
      autoFocus: true,
      className: `w-full bg-transparent border-none outline-none p-0 m-0 focus:ring-0 focus:outline-none resize-none break-words overflow-hidden ${className}`
    };

    return as === 'textarea' ? (
      <textarea ref={textareaRef} {...commonProps} rows={rows} placeholder={placeholder}></textarea>
    ) : (
      <input {...commonProps} placeholder={placeholder} />
    );
  }

  return (
    <>
      <style>{cursorStyle}</style>
      <div
        onClick={() => setIsEditing(true)}
        className={`group/inline-edit cursor-pointer block max-w-full ${className}`}
      >
        <span className="whitespace-pre-wrap break-words inline-block w-full">
          {value || <span className="text-white/20">{placeholder}</span>}
          {showCursor && <span className="blinking-cursor opacity-0 group-hover/inline-edit:opacity-100 transition-opacity shrink-0"></span>}
        </span>
      </div>
    </>
  );
};

export default InlineEdit;