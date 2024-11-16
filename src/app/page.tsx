import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer, Trophy, Users, Map, ArrowRight } from "lucide-react";

// Dummy data
const recentRecords = [
  {
    course: "Beach Loop",
    time: "12:32.76",
    rider: "John Doe",
    boardType: "GT",
    date: "2024-03-15",
    isPersonalBest: true,
    isCourseRecord: true
  },
  {
    course: "Forest Trail",
    time: "15:45.23",
    rider: "Jane Smith",
    boardType: "Pint X",
    date: "2024-03-14",
    isPersonalBest: true,
    isCourseRecord: false
  }
];

const courseStats = [
  {
    name: "Beach Loop",
    totalRuns: 45,
    avgTime: "13:45.89",
    recordHolder: "John Doe",
    recordTime: "12:32.76"
  },
  {
    name: "Forest Trail",
    totalRuns: 32,
    avgTime: "16:22.45",
    recordHolder: "Jane Smith",
    recordTime: "15:45.23"
  }
];

const topRiders = [
  { name: "John Doe", records: 3, totalRuns: 25 },
  { name: "Jane Smith", records: 2, totalRuns: 18 },
  { name: "Mike Johnson", records: 1, totalRuns: 15 }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              OneWheel Time Trials Tracker
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Track your OneWheel time trials, compete with friends, and break records on your favorite courses.
            </p>
            <div className="flex gap-4">
              <Link href="/runs">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                  View Time Trials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/manage">
                <Button size="lg" variant="outline" className="text-black border-white hover:bg-blue-700">
                  Manage Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to begin tracking your time trials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2">
                  1
                </div>
                <h3 className="font-medium">Set Up Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Visit the management page to add your rider profile and select your board type.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2">
                  2
                </div>
                <h3 className="font-medium">Choose a Course</h3>
                <p className="text-sm text-muted-foreground">
                  Browse available time trial courses or add your own custom track.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2">
                  3
                </div>
                <h3 className="font-medium">Record Your Runs</h3>
                <p className="text-sm text-muted-foreground">
                  Start tracking your time trials and compete for the best times.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-4 h-4 mr-2 text-blue-600">
                <Trophy className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-4 h-4 mr-2 text-blue-600">
                <Timer className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">77</div>
              <p className="text-xs text-muted-foreground">All time trials</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-4 h-4 mr-2 text-blue-600">
                <Users className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-medium">Active Riders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Registered riders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-4 h-4 mr-2 text-blue-600">
                <Map className="w-4 h-4" />
              </div>
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Available tracks</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Records */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Recent Records</CardTitle>
              <CardDescription>Latest achievements across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div>
                      <p className="font-medium">{record.course}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.rider} • {record.boardType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold">{record.time}</p>
                      <div className="flex gap-2 justify-end">
                        {record.isPersonalBest && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">PB</span>
                        )}
                        {record.isCourseRecord && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">CR</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Riders</CardTitle>
              <CardDescription>Most active and successful riders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRiders.map((rider, index) => (
                  <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{rider.name}</p>
                        <p className="text-sm text-muted-foreground">{rider.totalRuns} runs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{rider.records}</p>
                      <p className="text-xs text-muted-foreground">records held</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Overview */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
              <CardDescription>Overview of all available time trial courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseStats.map((course, index) => (
                  <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b last:border-0 pb-4 last:pb-0">
                    <div>
                      <p className="text-sm text-muted-foreground">Course</p>
                      <p className="font-medium">{course.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Runs</p>
                      <p className="font-medium">{course.totalRuns}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Time</p>
                      <p className="font-mono font-medium">{course.avgTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Record</p>
                      <p className="font-mono font-medium">{course.recordTime}</p>
                      <p className="text-xs text-muted-foreground">by {course.recordHolder}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}