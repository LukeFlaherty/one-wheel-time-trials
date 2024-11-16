// components/runs/runs-filter-bar.tsx
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filters } from "@/hooks/use-runs";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

interface RunsFilterBarProps {
  filters: Filters;
  onFilter: (filters: Partial<Filters>) => void;
}

export function RunsFilterBar({ filters, onFilter }: RunsFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    onFilter({ 
      dateRange: { 
        from: date || null,
        to: filters.dateRange?.to || null
      } 
    });
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by course or rider..."
            className="pl-10"
            value={filters.course || ''}
            onChange={(e) => onFilter({ course: e.target.value || undefined })}
          />
        </div>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Board Type</label>
              <Select
                value={filters.boardType || undefined}
                onValueChange={(value) => onFilter({ boardType: value || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All board types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All board types</SelectItem>
                  <SelectItem value="GT">GT</SelectItem>
                  <SelectItem value="Pint X">Pint X</SelectItem>
                  <SelectItem value="Pint">Pint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="grid gap-2">
                <Calendar
                  mode="single"
                  selected={filters.dateRange?.from || undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="records"
                checked={filters.hasRecord || false}
                onCheckedChange={(checked) => 
                  onFilter({ hasRecord: checked as boolean })
                }
              />
              <label 
                htmlFor="records" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show only records (PB/CR)
              </label>
            </div>

            <Button 
              className="w-full"
              variant="outline"
              onClick={() => {
                onFilter({
                  course: undefined,
                  rider: undefined,
                  boardType: undefined,
                  hasRecord: undefined,
                  dateRange: {
                    from: null,
                    to: null
                  }
                });
                setIsOpen(false);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}