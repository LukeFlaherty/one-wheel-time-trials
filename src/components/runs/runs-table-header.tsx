import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortField } from "@/hooks/use-runs";

interface RunsTableHeaderProps {
  sortConfig: {
    field: SortField;
    order: 'asc' | 'desc';
  };
  onSort: (field: SortField) => void;
}

export function RunsTableHeader({ sortConfig, onSort }: RunsTableHeaderProps) {
  const SortableHeader = ({ 
    field, 
    children 
  }: { 
    field: SortField; 
    children: React.ReactNode 
  }) => (
    <Button
      variant="ghost"
      className="h-8 flex items-center gap-1 font-medium"
      onClick={() => onSort(field)}
    >
      {children}
      <ArrowUpDown className={`ml-1 h-4 w-4 ${
        sortConfig.field === field ? 'opacity-100' : 'opacity-40'
      }`} />
    </Button>
  );

  return (
    <thead>
      <tr className="border-b bg-gray-50">
        <th className="h-12 px-4 text-left align-middle">
          <SortableHeader field="course">Course</SortableHeader>
        </th>
        <th className="h-12 px-4 text-left align-middle">
          <SortableHeader field="rider">Rider</SortableHeader>
        </th>
        <th className="h-12 px-4 text-left align-middle">
          <SortableHeader field="time">Time</SortableHeader>
        </th>
        <th className="h-12 px-4 text-left align-middle">
          <SortableHeader field="boardType">Board Type</SortableHeader>
        </th>
        <th className="h-12 px-4 text-left align-middle text-gray-500 font-medium">
          Time of Day
        </th>
        <th className="h-12 px-4 text-left align-middle">
          <SortableHeader field="date">Date</SortableHeader>
        </th>
        <th className="h-12 px-4 text-left align-middle text-gray-500 font-medium">
          Notes
        </th>
        <th className="h-12 px-4 text-left align-middle text-gray-500 font-medium">
          Records
        </th>
        <th className="h-12 w-[50px] px-4 text-left align-middle"></th>
      </tr>
    </thead>
  );
}