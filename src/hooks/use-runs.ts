// hooks/use-runs.ts
import { useState, useEffect, useMemo } from 'react';
import { toast } from "sonner";

export interface TimeTrialRun {
  id: string;
  course: {
    name: string;
  };
  rider: {
    name: string;
  };
  time: string;
  boardType: {
    name: string;
  };
  timeOfDay: string;
  date: string;
  notes: string | null;
  isPersonalBest: boolean;
  isCourseRecord: boolean;
}

export type SortField = 'course' | 'rider' | 'time' | 'boardType' | 'date';
export type SortOrder = 'asc' | 'desc';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface Filters {
  course?: string;
  rider?: string;
  boardType?: string;
  hasRecord?: boolean;
  dateRange?: DateRange;
}

export function useRuns() {
  const [runs, setRuns] = useState<TimeTrialRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    order: SortOrder;
  }>({ field: 'date', order: 'desc' });
  const [filters, setFilters] = useState<Filters>({});

  const fetchRuns = async () => {
    try {
      const response = await fetch('/api/getRuns');
      if (!response.ok) throw new Error('Failed to fetch runs');
      const data = await response.json();
      setRuns(data);
      setError(null);
    } catch (err) {
      setError('Failed to load time trial runs');
      console.error('Error fetching runs:', err);
      toast.error("Failed to load time trials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this run?')) {
      try {
        const response = await fetch(`/api/deleteRun/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete run');
        toast.success("Run deleted successfully");
        await fetchRuns();
      } catch (err) {
        console.error('Error deleting run:', err);
        toast.error("Failed to delete run");
      }
    }
  };

  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      order: 
        current.field === field && current.order === 'asc' 
          ? 'desc' 
          : 'asc',
    }));
  };

  const handleFilter = (newFilters: Partial<Filters>) => {
    setFilters(current => ({
      ...current,
      ...newFilters,
    }));
  };

  const filteredAndSortedRuns = useMemo(() => {
    let result = [...runs];

    // Apply filters
    if (filters.course) {
      result = result.filter(run => 
        run.course.name.toLowerCase().includes(filters.course!.toLowerCase())
      );
    }
    if (filters.rider) {
      result = result.filter(run => 
        run.rider.name.toLowerCase().includes(filters.rider!.toLowerCase())
      );
    }
    if (filters.boardType) {
      result = result.filter(run => 
        run.boardType.name.toLowerCase().includes(filters.boardType!.toLowerCase())
      );
    }
    if (filters.hasRecord) {
      result = result.filter(run => 
        run.isPersonalBest || run.isCourseRecord
      );
    }
    if (filters.dateRange?.from || filters.dateRange?.to) {
      result = result.filter(run => {
        const runDate = new Date(run.date);
        const isAfterFrom = !filters.dateRange?.from || runDate >= filters.dateRange.from;
        const isBeforeTo = !filters.dateRange?.to || runDate <= filters.dateRange.to;
        return isAfterFrom && isBeforeTo;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB;

      switch (sortConfig.field) {
        case 'course':
          valueA = a.course.name;
          valueB = b.course.name;
          break;
        case 'rider':
          valueA = a.rider.name;
          valueB = b.rider.name;
          break;
        case 'time':
          // Convert time strings to seconds for comparison
          valueA = timeToSeconds(a.time);
          valueB = timeToSeconds(b.time);
          break;
        case 'boardType':
          valueA = a.boardType.name;
          valueB = b.boardType.name;
          break;
        case 'date':
          valueA = new Date(a.date).getTime();
          valueB = new Date(b.date).getTime();
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortConfig.order === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [runs, sortConfig, filters]);

  useEffect(() => {
    fetchRuns();
  }, []);

  return {
    runs: filteredAndSortedRuns,
    isLoading,
    error,
    fetchRuns,
    handleDelete,
    handleSort,
    handleFilter,
    sortConfig,
    filters,
  };
}

// Helper function to convert time string to seconds
function timeToSeconds(time: string): number {
  const [minutes, secondsMs] = time.split(':');
  const [seconds, ms] = secondsMs.split('.');
  return (
    parseInt(minutes) * 60 + 
    parseInt(seconds) + 
    parseInt(ms) / 100
  );
}