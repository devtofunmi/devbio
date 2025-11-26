import React, { useState } from 'react';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  as?: 'input' | 'textarea';
  className?: string;
  placeholder?: string;
  showCursor?: boolean;
}

const InlineEdit: React.FC<InlineEditProps> = ({ value, onSave, as = 'input', className, placeholder, showCursor = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

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
      className: `w-full bg-transparent border-none outline-none p-0 m-0 focus:ring-0 focus:outline-none resize-none ${className}`
    };

    return as === 'textarea' ? (
      <textarea {...commonProps} rows={4} placeholder={placeholder}></textarea>
    ) : (
      <input {...commonProps} placeholder={placeholder} />
    );
  }

  return (
    <>
      <style>{cursorStyle}</style>
      <div onClick={() => setIsEditing(true)} className={`group/inline-edit cursor-pointer flex items-center ${className}`}>
        {value || <span className="text-gray-400">{placeholder}</span>}
        {showCursor && <span className="blinking-cursor opacity-0 group-hover/inline-edit:opacity-100 transition-opacity"></span>}
      </div>
    </>
  );
};

export default InlineEdit;
