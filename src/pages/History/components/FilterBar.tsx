import React from 'react';
import { Select, DatePicker } from 'antd';
import { Filter } from 'lucide-react';

const { RangePicker } = DatePicker;

interface FilterBarProps {
  filters: {
    status: string;
    dateRange: [Date, Date] | null;
  };
  onChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="font-medium">Filters:</span>
      </div>
      <Select
        placeholder="Status"
        className="w-32"
        value={filters.status}
        onChange={(value) => onChange({ ...filters, status: value })}
        options={[
          { value: 'all', label: 'All' },
          { value: 'completed', label: 'Completed' },
          { value: 'processing', label: 'Processing' },
          { value: 'failed', label: 'Failed' },
        ]}
      />
      <RangePicker 
        placeholder={['Start Date', 'End Date']}
        className="w-64"
        value={filters.dateRange}
        onChange={(dates) => onChange({ ...filters, dateRange: dates })}
      />
    </div>
  );
};