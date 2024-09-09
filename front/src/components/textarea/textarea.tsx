import React from 'react';
import { AutosizeTextarea } from '@/components/ui/textareaResize';

interface AutosizeTextareaDemoProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string
}

const AutosizeTextareaDemo: React.FC<AutosizeTextareaDemoProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-full py-1">
      <AutosizeTextarea
        id="message-2"
        maxHeight={200}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AutosizeTextareaDemo;
