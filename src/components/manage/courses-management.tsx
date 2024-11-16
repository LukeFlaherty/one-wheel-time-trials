// components/manage/CoursesManagement.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  description: string | null;
  distance: number | null;
  difficulty: string | null;
  location: string | null;
  elevation: number | null;
  isActive: boolean;
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    distance: '',
    difficulty: '',
    location: '',
    elevation: '',
    isActive: true,
  });

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/manage/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/manage/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          distance: formData.distance ? parseFloat(formData.distance) : null,
          elevation: formData.elevation ? parseInt(formData.elevation) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to add course');
      
      await fetchCourses();
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        description: '',
        distance: '',
        difficulty: '',
        location: '',
        elevation: '',
        isActive: true,
      });
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/manage/courses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      await fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Course Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the course..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Distance (miles)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.distance}
                    onChange={e => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={value => setFormData(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Elevation (ft)</label>
                  <Input
                    type="number"
                    value={formData.elevation}
                    onChange={e => setFormData(prev => ({ ...prev, elevation: e.target.value }))}
                  />
                </div>
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
                  {isLoading ? "Adding..." : "Add Course"}
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
              <th className="text-left p-4">Distance</th>
              <th className="text-left p-4">Difficulty</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b">
                <td className="p-4">{course.name}</td>
                <td className="p-4">{course.distance ? `${course.distance} mi` : '-'}</td>
                <td className="p-4 capitalize">{course.difficulty || '-'}</td>
                <td className="p-4">{course.location || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    course.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {course.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(course.id)}
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