// app/manage/page.tsx
'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RidersManagement from '@/components/manage/riders-management';
import BoardTypesManagement from '@/components/manage/board-types-management';
import CoursesManagement from '@/components/manage/courses-management';

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
          <Card>
            <CardHeader>
              <CardTitle>Manage Riders</CardTitle>
              <CardDescription>Add, edit, or remove rider profiles.</CardDescription>
            </CardHeader>
            <CardContent>
              <RidersManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Manage Courses</CardTitle>
              <CardDescription>Configure available time trial courses.</CardDescription>
            </CardHeader>
            <CardContent>
              <CoursesManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="boards">
          <Card>
            <CardHeader>
              <CardTitle>Manage Board Types</CardTitle>
              <CardDescription>Set up different OneWheel board options.</CardDescription>
            </CardHeader>
            <CardContent>
              <BoardTypesManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}