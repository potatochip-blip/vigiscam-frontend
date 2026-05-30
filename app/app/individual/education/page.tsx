import { PageLayout } from "@/components/dashboard/page-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, PlayCircle, FileText, Trophy, Clock, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const courses = [
  { title: "Recognizing Tech Support Scams", type: "Video", duration: "8 min", completed: true, level: "Beginner" },
  { title: "How Voice Cloning Works", type: "Article", duration: "5 min", completed: true, level: "Intermediate" },
  { title: "Bank Impersonation — Red Flags", type: "Video", duration: "12 min", completed: false, level: "Beginner" },
  { title: "What to Do If You've Been Scammed", type: "Guide", duration: "15 min", completed: false, level: "All Levels" },
  { title: "Protecting Elderly Family Members", type: "Video", duration: "10 min", completed: false, level: "Intermediate" },
  { title: "Romance Scam Warning Signs", type: "Article", duration: "7 min", completed: false, level: "Intermediate" },
]

export default function EducationPage() {
  return (
    <PageLayout role="individual" title="Education" subtitle="Learn to recognize and avoid scams">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <div>
                <h2 className="text-lg font-bold text-foreground">Your Learning Progress</h2>
                <p className="text-sm text-muted-foreground">2 of 6 modules completed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">33%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "33%" }} />
          </div>
        </Card>

        {/* Courses */}
        <div className="grid sm:grid-cols-2 gap-4">
          {courses.map((course, i) => (
            <Card key={i} className={`p-5 ${course.completed ? "opacity-75" : ""}`}>
              <div className="flex items-start gap-3">
                {course.type === "Video" ? (
                  <PlayCircle className="h-8 w-8 text-primary flex-shrink-0" />
                ) : (
                  <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-foreground">{course.title}</h3>
                    {course.completed && <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge className="text-xs border-0 bg-muted text-muted-foreground">{course.type}</Badge>
                    <Badge className="text-xs border-0 bg-muted text-muted-foreground">{course.level}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                  </div>
                  <Button size="sm" variant={course.completed ? "outline" : "default"} className="text-xs">
                    {course.completed ? "Review" : "Start"} <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Scam Library Link */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold text-foreground">Full Scam Type Library</h3>
                <p className="text-sm text-muted-foreground">Detailed guides on 11 scam types with red flags and response steps</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/scam-types">Explore Library <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
