import React from 'react';
import { useFormContext, useWatch, Control } from 'react-hook-form';
import { Trash2, GripVertical } from 'lucide-react';
import FieldTypeSelector from './FieldTypeSelector';
import NestedFields from './NestedFields';
import { SchemaFormData } from '../types/schema';

interface FieldRowProps {
  control: Control<SchemaFormData>;
  fieldIndex: number;
  onRemove: () => void;
  fieldPath: string;
  level?: number;
}

const FieldRow: React.FC<FieldRowProps> = ({
  control,
  onRemove,
  fieldPath,
  level = 1,
}) => {
  const { register, setValue } = useFormContext<SchemaFormData>();

  const fieldType = useWatch({
    control,
    name: `${fieldPath}.type` as any,
  }) as 'string' | 'number' | 'nested' | undefined;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center text-gray-400">
          <GripVertical className="h-4 w-4" />
        </div>

        <div className="flex-1">
          <input
            {...register(`${fieldPath}.name` as any)}
            placeholder="Enter field name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          />
        </div>

        <div className="flex-shrink-0">
          <FieldTypeSelector
            value={fieldType || 'string'}
            onChange={(type) => {
              setValue(`${fieldPath}.type` as any, type);
              if (type !== 'nested') {
                setValue(`${fieldPath}.nested` as any, []);
              }
            }}
          />
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center w-10 h-10 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {fieldType === 'nested' && (
        <NestedFields control={control} fieldPath={fieldPath} level={level + 1} />
      )}
    </div>
  );
};

export default FieldRow;
