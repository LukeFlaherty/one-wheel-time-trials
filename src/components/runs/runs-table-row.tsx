import { TimeTrialRun } from "@/hooks/use-runs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface RunsTableRowProps {
  run: TimeTrialRun;
  onDelete: (id: string) => Promise<void>;
}

export function RunsTableRow({ run, onDelete }: RunsTableRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{run.course.name}</td>
      <td className="p-4">{run.rider.name}</td>
      <td className="p-4 font-mono font-medium">{run.time}</td>
      <td className="p-4">{run.boardType.name}</td>
      <td className="p-4">{run.timeOfDay}</td>
      <td className="p-4">
        {new Date(run.date).toLocaleDateString()}
      </td>
      <td className="p-4 max-w-[200px] truncate">
        {run.notes}
      </td>
      <td className="p-4">
        <div className="flex gap-1">
          {run.isPersonalBest && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              PB
            </span>
          )}
          {run.isCourseRecord && (
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
              CR
            </span>
          )}
        </div>
      </td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => alert('Edit functionality coming soon!')}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(run.id)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

