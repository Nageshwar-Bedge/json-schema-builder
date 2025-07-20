import React from 'react';
import {
  useForm,
  useFieldArray,
  useWatch,
  FormProvider,
} from 'react-hook-form';
import { Plus, Code, Sparkles, Download } from 'lucide-react';
import FieldRow from './FieldRow';
import JsonPreview from './JsonPreview';
import { SchemaFormData, SchemaField } from '../types/schema';
import { generateJsonFromSchema } from '../utils/jsonGenerator';

const JsonSchemaBuilder: React.FC = () => {
  const methods = useForm<SchemaFormData>({
    defaultValues: {
      fields: [
        {
          id: '1',
          name: 'title',
          type: 'string',
          nested: [],
        },
        {
          id: '2',
          name: 'count',
          type: 'number',
          nested: [],
        },
      ],
    },
  });

  const { control, handleSubmit} = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const watchedFields = useWatch({
    control,
    name: 'fields',
  });

  const jsonOutput = generateJsonFromSchema(watchedFields || []);

  const addField = () => {
    const newField: SchemaField = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      type: 'string',
      nested: [],
    };
    append(newField);
  };

  const downloadJson = (data: object, filename = 'schema.json') => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const onSubmit = (data: SchemaFormData) => {
    const generated = generateJsonFromSchema(data.fields);
    downloadJson(generated);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JSON Schema Builder
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create complex JSON schemas with an intuitive drag-and-drop interface.
              Support for nested structures, real-time preview, and dynamic field management.
            </p>
          </div>

          {/* Export button top right */}
          <div className="flex justify-end mb-4">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4" />
              Export Schema
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Schema Builder */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Schema Fields</h2>
                  </div>
                  <button
                    type="button"
                    onClick={addField}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4" />
                    Add Field
                  </button>
                </div>

                <div className="p-6 max-h-[460px] overflow-y-auto">
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <FieldRow
                        key={field.id}
                        control={control}
                        fieldIndex={index}
                        onRemove={() => remove(index)}
                        fieldPath={`fields.${index}`}
                      />
                    ))}

                    {fields.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No fields yet</p>
                        <p className="text-sm">Click "Add Field" to start building your schema.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* JSON Preview */}
              <JsonPreview jsonData={jsonOutput} />
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default JsonSchemaBuilder;
