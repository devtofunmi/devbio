import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

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

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    e.target.setSelectionRange(val.length, val.length);
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
      onBlur: (e: React.FocusEvent) => {
        // handleSave(); // Removing auto-save on blur to rely on buttons? 
        // User said "user wont know they have to on focus field".
        // If I remove blur save, they MUST click save.
        // But usually click outside expects save.
        // I'll keep save on blur, but buttons make it explicit.
        // BUT check buttons are inside.
        // If I click Save button, blur fires for input?
        // By using onMouseDown on button with preventDefault, blur doesn't fire immediately?
        // Actually, if I keep save on blur, clicking outside saves. That is good behavior.
        // The buttons are just visual affordance.
        handleSave();
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && as !== 'textarea') {
          handleSave();
        }
        if (e.key === 'Escape') {
          handleCancel();
        }
      },
      autoFocus: true,
      className: `w-full bg-transparent border-none outline-none m-0 focus:ring-0 focus:outline-none resize-none break-words overflow-hidden p-2 -ml-2 rounded-lg bg-white/5 ${className}` // Added some bg and padding for edit mode context
    };

    return (
      <div className="relative w-full">
        {as === 'textarea' ? (
          <textarea
            ref={textareaRef}
            {...commonProps}
            rows={rows}
            placeholder={placeholder}
            onFocus={handleFocus}
            className={`${commonProps.className} pr-14`}
          />
        ) : (
          <input
            {...commonProps}
            placeholder={placeholder}
            onFocus={handleFocus}
            className={`${commonProps.className} pr-14`}
          />
        )}
        <div className="absolute right-0 top-0 h-full flex items-center pr-2 gap-1">
          <button
            onMouseDown={(e) => { e.preventDefault(); handleSave(); }}
            className="p-1.5 bg-green-500/20 text-green-500 hover:bg-green-500/30 rounded-md transition-all"
            title="Save"
          >
            <FaCheck size={12} />
          </button>
          <button
            onMouseDown={(e) => { e.preventDefault(); handleCancel(); }}
            className="p-1.5 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-md transition-all"
            title="Cancel"
          >
            <FaTimes size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{cursorStyle}</style>
      <div
        onClick={() => setIsEditing(true)}
        className={`group/inline-edit cursor-text block max-w-full ${className} hover:bg-white/5 rounded-lg -ml-2 p-2 transition-colors`}
        title="Click to edit"
      >
        <span className="whitespace-pre-wrap break-words inline-block w-full relative">
          {value || <span className="text-white/20">{placeholder}</span>}
          {showCursor && <span className="blinking-cursor opacity-0 group-hover/inline-edit:opacity-100 transition-opacity shrink-0"></span>}
        </span>
      </div>
    </>
  );
};

export default InlineEdit;