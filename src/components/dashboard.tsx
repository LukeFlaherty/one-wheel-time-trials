"use client"

import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import AddRideModal from './add-ride-modal';


interface TimeTrialRun {
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

export default function TimeTrialDashboard() {
  const [runs, setRuns] = useState<TimeTrialRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch runs from the API
  const fetchRuns = async () => {
    try {
      const response = await fetch('/api/getRuns');
      if (!response.ok) {
        throw new Error('Failed to fetch runs');
      }
      const data = await response.json();
      setRuns(data);
      setError(null);
    } catch (err) {
      setError('Failed to load time trial runs');
      console.error('Error fetching runs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRuns();
  }, []);

  // Handle successful addition of new run
  const handleAddSuccess = () => {
    fetchRuns();
  };

  // Handle run deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this run?')) {
      try {
        const response = await fetch(`/api/deleteRun/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete run');
        }
        
        fetchRuns();
      } catch (err) {
        console.error('Error deleting run:', err);
        setError('Failed to delete run');
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">OneWheel Time Trials</h1>
        <AddRideModal onSuccess={handleAddSuccess} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="w-full overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Course</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Rider</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Time</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Board Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Time of Day</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Notes</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Records</th>
                  <th className="h-12 w-[50px] px-4 text-left align-middle font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {runs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="h-24 text-center text-gray-500">
                      No time trials recorded yet. Add your first run!
                    </td>
                  </tr>
                ) : (
                  runs.map((run) => (
                    <tr key={run.id} className="border-b">
                      <td className="p-4">{run.course.name}</td>
                      <td className="p-4">{run.rider.name}</td>
                      <td className="p-4 font-mono">{run.time}</td>
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
                              onClick={() => handleDelete(run.id)}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}