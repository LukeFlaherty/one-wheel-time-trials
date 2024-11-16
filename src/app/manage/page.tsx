"use client"

// app/manage/page.tsx
import BoardTypesManagement from "@/components/manage/board-types-management";
import CoursesManagement from "@/components/manage/courses-management";
import RidersManagement from "@/components/manage/riders-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function ManagePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Time Trial Options</h1>
      
      <Tabs defaultValue="riders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="riders">Riders</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="boards">Board Types</TabsTrigger>
        </TabsList>
        
        <TabsContent value="riders">
          <RidersManagement />
        </TabsContent>

        <TabsContent value="courses">
          <CoursesManagement />
        </TabsContent>

        <TabsContent value="boards">
          <BoardTypesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}