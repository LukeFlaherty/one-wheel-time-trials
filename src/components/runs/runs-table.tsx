// components/runs/runs-table.tsx
import { TimeTrialRun, SortField, Filters } from "@/hooks/use-runs";
import { RunsTableHeader } from "./runs-table-header";
import { RunsTableRow } from "./runs-table-row";
import { RunsFilterBar } from "./runs-filter-bar";

interface RunsTableProps {
  runs: TimeTrialRun[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
  sortConfig: {
    field: SortField;
    order: 'asc' | 'desc';
  };
  onSort: (field: SortField) => void;
  filters: Filters;
  onFilter: (filters: Partial<Filters>) => void;
}

export function RunsTable({ 
  runs, 
  isLoading, 
  onDelete,
  sortConfig,
  onSort,
  filters,
  onFilter,
}: RunsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <RunsFilterBar filters={filters} onFilter={onFilter} />
      
      <div className="rounded-md border bg-white">
        <div className="w-full overflow-auto">
          <table className="w-full text-sm">
            <RunsTableHeader 
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <tbody>
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="h-24 text-center text-gray-500">
                    {Object.keys(filters).length > 0 
                      ? "No runs match your filters. Try adjusting your search criteria."
                      : "No time trials recorded yet. Add your first run!"}
                  </td>
                </tr>
              ) : (
                runs.map((run) => (
                  <RunsTableRow 
                    key={run.id} 
                    run={run} 
                    onDelete={onDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {runs.length > 0 && (
        <div className="py-4 text-sm text-gray-500">
          Showing {runs.length} {runs.length === 1 ? 'run' : 'runs'}
          {Object.keys(filters).length > 0 && ' with current filters'}
        </div>
      )}
    </div>
  );
}

