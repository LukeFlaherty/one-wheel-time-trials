// app/runs/page.tsx
"use client";

import { RunsHeader } from "@/components/runs/runs-header";
import { RunsTable } from "@/components/runs/runs-table";
import { useRuns } from "@/hooks/use-runs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function RunsPage() {
  const { 
    runs, 
    isLoading, 
    error, 
    fetchRuns, 
    handleDelete,
    handleSort,
    handleFilter,
    sortConfig,
    filters
  } = useRuns();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header section */}
        <RunsHeader onSuccess={fetchRuns} />
        
        {/* Error alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Main table */}
        <RunsTable 
          runs={runs}
          isLoading={isLoading}
          onDelete={handleDelete}
          sortConfig={sortConfig}
          onSort={handleSort}
          filters={filters}
          onFilter={handleFilter}
        />
      </div>

      {/* Optional: Add keyboard shortcuts or help text */}
      <div className="mt-8 text-sm text-gray-500">
        <p>
          Tip: Use the filters above to narrow down your results. Click column headers to sort.
        </p>
      </div>
    </div>
  );
}