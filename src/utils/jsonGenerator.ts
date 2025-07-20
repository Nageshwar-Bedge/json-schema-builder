import { SchemaField } from '../types/schema';

export const generateJsonFromSchema = (fields: SchemaField[]): Record<string, any> => {
  const result: Record<string, any> = {};
  
  fields.forEach(field => {
    if (!field.name.trim()) return;
    
    switch (field.type) {
      case 'string':
        result[field.name] = 'String';
        break;
      case 'number':
        result[field.name] = 'Number';
        break;
      case 'nested':
        if (field.nested && field.nested.length > 0) {
          result[field.name] = generateJsonFromSchema(field.nested);
        } else {
          result[field.name] = {};
        }
        break;
      default:
        result[field.name] = null;
    }
  });
  
  return result;
};