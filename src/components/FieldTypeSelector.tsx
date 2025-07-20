import React from 'react';
import { Type, Hash, Layers } from 'lucide-react';

interface FieldTypeSelectorProps {
  value: 'string' | 'number' | 'nested';
  onChange: (type: 'string' | 'number' | 'nested') => void;
}

const FieldTypeSelector: React.FC<FieldTypeSelectorProps> = ({ value, onChange }) => {
  const types = [
    { value: 'string' as const, label: 'String', icon: Type, color: 'text-blue-600 bg-blue-50' },
    { value: 'number' as const, label: 'Number', icon: Hash, color: 'text-green-600 bg-green-50' },
    { value: 'nested' as const, label: 'Nested', icon: Layers, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
      {types.map((type) => {
        const Icon = type.icon;
        const isSelected = value === type.value;
        
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`
              flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${isSelected 
                ? `${type.color} shadow-sm` 
                : 'text-gray-600 hover:text-gray-800 hover:bg-white'
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {type.label}
          </button>
        );
      })}
    </div>
  );
};

export default FieldTypeSelector;