// components/manage/BoardTypesManagement.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface BoardType {
  id: string;
  name: string;
  description: string | null;
}

export default function BoardTypesManagement() {
  const [boardTypes, setBoardTypes] = useState<BoardType[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const fetchBoardTypes = async () => {
    try {
      const response = await fetch('/api/manage/boardTypes');
      if (!response.ok) throw new Error('Failed to fetch board types');
      const data = await response.json();
      setBoardTypes(data);
    } catch (error) {
      console.error('Error fetching board types:', error);
    }
  };

  useEffect(() => {
    fetchBoardTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/manage/boardTypes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add board type');
      
      await fetchBoardTypes();
      setIsAddDialogOpen(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding board type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this board type?')) return;

    try {
      const response = await fetch(`/api/manage/boardTypes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete board type');
      await fetchBoardTypes();
    } catch (error) {
      console.error('Error deleting board type:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Board Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Board Type</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Board Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., GT, Pint X"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the board type..."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Board Type"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {boardTypes.map((boardType) => (
              <tr key={boardType.id} className="border-b">
                <td className="p-4">{boardType.name}</td>
                <td className="p-4">{boardType.description || '-'}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(boardType.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}