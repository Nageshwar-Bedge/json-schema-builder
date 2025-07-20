export interface SchemaField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'nested';
  nested?: SchemaField[];
}

export interface SchemaFormData {
  fields: SchemaField[];
}