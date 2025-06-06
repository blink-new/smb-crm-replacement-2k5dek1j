import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  Filter, 
  Calendar,
  Clock,
  Phone,
  Mail,
  Video,
  FileText,
  MoreHorizontal,
  CheckSquare,
  AlertCircle,
  User
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data
const tasks = [
  {
    id: 1,
    title: 'Follow up call with Acme Corp',
    description: 'Discuss pricing and implementation timeline',
    type: 'Call',
    priority: 'high',
    dueDate: '2024-01-17T14:00:00',
    completed: false,
    contact: 'Sarah Johnson',
    company: 'Acme Corp',
    assignee: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    title: 'Send proposal to TechStart',
    description: 'Include updated pricing and terms',
    type: 'Email',
    priority: 'medium',
    dueDate: '2024-01-17T16:30:00',
    completed: false,
    contact: 'Michael Chen',
    company: 'TechStart Inc',
    assignee: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    title: 'Product demo for Global Solutions',
    description: 'Showcase key features and integrations',
    type: 'Meeting',
    priority: 'high',
    dueDate: '2024-01-18T10:00:00',
    completed: false,
    contact: 'Emily Rodriguez',
    company: 'Global Solutions',
    assignee: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    title: 'Contract review with legal',
    description: 'Review terms and conditions',
    type: 'Document',
    priority: 'low',
    dueDate: '2024-01-19T09:00:00',
    completed: true,
    contact: 'David Kim',
    company: 'Innovation Labs',
    assignee: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    title: 'Quarterly business review preparation',
    description: 'Prepare slides and metrics',
    type: 'Document',
    priority: 'medium',
    dueDate: '2024-01-20T11:00:00',
    completed: false,
    contact: 'Lisa Wang',
    company: 'Design Co',
    assignee: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face'
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Call': return Phone
    case 'Email': return Mail
    case 'Meeting': return Video
    case 'Document': return FileText
    default: return CheckSquare
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Call': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'Email': return 'bg-green-100 text-green-700 border-green-200'
    case 'Meeting': return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'Document': return 'bg-orange-100 text-orange-700 border-orange-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const isTomorrow = date.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()
  
  if (isToday) return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  if (isTomorrow) return `Tomorrow ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const isOverdue = (dateString: string) => {
  return new Date(dateString) < new Date()
}

export default function Tasks() {
  const [taskList, setTaskList] = useState(tasks)
  const [activeTab, setActiveTab] = useState('all')

  const toggleTask = (taskId: number) => {
    setTaskList(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'pending':
        return taskList.filter(task => !task.completed)
      case 'completed':
        return taskList.filter(task => task.completed)
      case 'overdue':
        return taskList.filter(task => !task.completed && isOverdue(task.dueDate))
      default:
        return taskList
    }
  }

  const filteredTasks = getFilteredTasks()
  const pendingTasks = taskList.filter(task => !task.completed).length
  const completedTasks = taskList.filter(task => task.completed).length
  const overdueTasks = taskList.filter(task => !task.completed && isOverdue(task.dueDate)).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage your activities and follow-ups</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus size={16} className="mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <CheckSquare className="text-blue-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{taskList.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Clock className="text-orange-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{pendingTasks}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <CheckSquare className="text-green-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedTasks}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-red-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{overdueTasks}</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Task Management
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar size={16} className="mr-2" />
                Calendar View
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({taskList.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingTasks})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueTasks})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const TypeIcon = getTypeIcon(task.type)
                  const isTaskOverdue = !task.completed && isOverdue(task.dueDate)
                  
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                        task.completed 
                          ? 'bg-gray-50 opacity-75' 
                          : isTaskOverdue 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                      
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={task.avatar} alt={task.contact} />
                        <AvatarFallback>{task.contact.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <Badge className={getTypeColor(task.type)}>
                            <TypeIcon size={12} className="mr-1" />
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{task.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <User size={12} className="mr-1" />
                            {task.contact} • {task.company}
                          </span>
                          <span className="flex items-center">
                            Assigned to: {task.assignee}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          isTaskOverdue ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {formatDate(task.dueDate)}
                        </div>
                        {isTaskOverdue && !task.completed && (
                          <div className="text-xs text-red-600 flex items-center mt-1">
                            <AlertCircle size={10} className="mr-1" />
                            Overdue
                          </div>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}