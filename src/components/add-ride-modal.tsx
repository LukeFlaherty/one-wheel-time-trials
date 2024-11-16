import React, { useState } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

interface AddRideModalProps {
  onSuccess?: () => void;
}

const AddRideModal = ({ onSuccess }: AddRideModalProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    courseId: '',
    riderId: '',
    time: '',
    boardTypeId: '',
    timeOfDay: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate time format
    const timeRegex = /^\d{2}:\d{2}\.\d{2}$/;
    if (!timeRegex.test(formData.time)) {
      toast.error("Invalid time format. Please use MM:SS.ms (e.g., 12:34.56)");
      setIsLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.courseId || !formData.riderId || !formData.boardTypeId || !formData.timeOfDay) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/addRide', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to add ride');
        }

        const data = await response.json();
        
        setOpen(false);
        if (onSuccess) onSuccess();
        
        // Reset form
        setFormData({
          courseId: '',
          riderId: '',
          time: '',
          boardTypeId: '',
          timeOfDay: '',
          date: new Date().toISOString().split('T')[0],
          notes: ''
        });

        resolve("Time trial run added successfully!");
      } catch (error) {
        console.error('Error adding ride:', error);
        reject(error instanceof Error ? error.message : "Failed to add time trial run");
      } finally {
        setIsLoading(false);
      }
    });

    toast.promise(promise, {
      loading: 'Adding time trial run...',
      success: (data) => {
        return data as string;
      },
      error: (error) => {
        return error as string;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Run
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Time Trial Run</DialogTitle>
          <DialogDescription>
            Record your latest OneWheel time trial run.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="course" className="text-sm font-medium">Course*</label>
            <Select
              value={formData.courseId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, courseId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Beach Loop</SelectItem>
                <SelectItem value="2">Forest Trail</SelectItem>
                <SelectItem value="3">Mountain Pass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="rider" className="text-sm font-medium">Rider Name*</label>
            <Input
              id="rider"
              value={formData.riderId}
              onChange={(e) => setFormData(prev => ({ ...prev, riderId: e.target.value }))}
              placeholder="Enter rider name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="text-sm font-medium">Time (MM:SS.ms)*</label>
            <Input
              id="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              placeholder="12:34.56"
              pattern="^[0-9]{2}:[0-9]{2}\.[0-9]{2}$"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="boardType" className="text-sm font-medium">Board Type*</label>
            <Select
              value={formData.boardTypeId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, boardTypeId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select board type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">GT</SelectItem>
                <SelectItem value="2">Pint X</SelectItem>
                <SelectItem value="3">Pint</SelectItem>
                <SelectItem value="4">XR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="timeOfDay" className="text-sm font-medium">Time of Day*</label>
            <Select
              value={formData.timeOfDay}
              onValueChange={(value) => setFormData(prev => ({ ...prev, timeOfDay: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i % 12 || 12;
                  const ampm = i < 12 ? 'AM' : 'PM';
                  const nextHour = (i + 1) % 12 || 12;
                  return (
                    <SelectItem key={i} value={`${hour}${ampm}-${nextHour}${ampm}`}>
                      {`${hour}${ampm}-${nextHour}${ampm}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Date*</label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any notes about the run"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⭐</span> 
                  Adding...
                </>
              ) : (
                "Add Run"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRideModal;