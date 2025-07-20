import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import FieldRow from './FieldRow';
import { SchemaFormData, SchemaField } from '../types/schema';
import { Plus, Layers } from 'lucide-react';

interface NestedFieldsProps {
  control: Control<SchemaFormData>;
  fieldPath: string;
  level: number;
}

const NestedFields: React.FC<NestedFieldsProps> = ({ control, fieldPath, level }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldPath}.nested` as any,
  });

  const addNestedField = () => {
    const newField: SchemaField = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      type: 'string',
      nested: [],
    };
    append(newField);
  };

  const bgColor = level % 2 === 0 ? 'bg-blue-50' : 'bg-indigo-50';
  const borderColor = level % 2 === 0 ? 'border-blue-200' : 'border-indigo-200';

  return (
    <div className={`mt-4 p-4 ${bgColor} ${borderColor} border-l-4 rounded-r-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">
            Nested Fields (Level {level})
          </span>
        </div>
        <button
          type="button"
          onClick={addNestedField}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-md transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Nested Field
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <FieldRow
            key={field.id}
            control={control}
            fieldIndex={index}
            onRemove={() => remove(index)}
            fieldPath={`${fieldPath}.nested.${index}`}
            level={level + 1}
          />
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No nested fields yet. Click "Add Nested Field" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NestedFields;