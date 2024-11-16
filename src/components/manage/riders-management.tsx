// components/manage/RidersManagement.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Rider {
  id: string;
  name: string;
  experienceLevel: string | null;
  email: string | null;
}

export default function RidersManagement() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experienceLevel: '',
  });

  const fetchRiders = async () => {
    try {
      const response = await fetch('/api/manage/riders');
      if (!response.ok) throw new Error('Failed to fetch riders');
      const data = await response.json();
      setRiders(data);
    } catch (error) {
      console.error('Error fetching riders:', error);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/manage/riders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add rider');
      
      await fetchRiders();
      setIsAddDialogOpen(false);
      setFormData({ name: '', email: '', experienceLevel: '' });
    } catch (error) {
      console.error('Error adding rider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rider?')) return;

    try {
      const response = await fetch(`/api/manage/riders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete rider');
      await fetchRiders();
    } catch (error) {
      console.error('Error deleting rider:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Rider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Rider</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email (optional)</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={value => setFormData(prev => ({ ...prev, experienceLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
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
                  {isLoading ? "Adding..." : "Add Rider"}
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
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Experience</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider.id} className="border-b">
                <td className="p-4">{rider.name}</td>
                <td className="p-4">{rider.email || '-'}</td>
                <td className="p-4">{rider.experienceLevel || '-'}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(rider.id)}
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