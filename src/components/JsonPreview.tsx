import React from 'react';
import { Eye } from 'lucide-react';

interface JsonPreviewProps {
  jsonData: Record<string, any>;
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ jsonData }) => {
  const formatJson = (obj: Record<string, any>) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
        <Eye className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">JSON Preview</h3>
      </div>
      <div className="p-6">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm font-mono h-96 border">
          <code>{formatJson(jsonData)}</code>
        </pre>
      </div>
    </div>
  );
};

export default JsonPreview;