// Memphis Design Dashboard - no traditional cards needed
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign,
  Clock,
  ArrowRight,
  Plus,
  Triangle,
  Circle,
  Square,
  Zap,
  Star
} from 'lucide-react'

// Mock data with Memphis colors
const stats = [
  {
    title: 'Total Contacts',
    value: '2,847',
    change: '+12.5%',
    icon: Users,
    bgColor: 'bg-memphis-pink',
    textColor: 'text-white'
  },
  {
    title: 'Active Deals',
    value: '47',
    change: '+8.2%',
    icon: Target,
    bgColor: 'bg-memphis-cyan',
    textColor: 'text-black'
  },
  {
    title: 'Revenue Goal',
    value: '$284K',
    change: '+23.1%',
    icon: TrendingUp,
    bgColor: 'bg-memphis-yellow',
    textColor: 'text-black'
  },
  {
    title: 'This Month',
    value: '$42K',
    change: '+15.3%',
    icon: DollarSign,
    bgColor: 'bg-memphis-green',
    textColor: 'text-white'
  }
]

const recentDeals = [
  { id: 1, company: 'Acme Corp', value: '$25,000', stage: 'Proposal', probability: 75, color: 'bg-memphis-pink' },
  { id: 2, company: 'TechStart Inc', value: '$18,500', stage: 'Negotiation', probability: 90, color: 'bg-memphis-cyan' },
  { id: 3, company: 'Global Solutions', value: '$32,000', stage: 'Qualified', probability: 60, color: 'bg-memphis-yellow' },
  { id: 4, company: 'Innovation Labs', value: '$12,800', stage: 'Discovery', probability: 40, color: 'bg-memphis-green' }
]

const upcomingTasks = [
  { id: 1, title: 'Follow up with Acme Corp', type: 'Call', due: '2 hours', priority: 'high', color: 'bg-memphis-red' },
  { id: 2, title: 'Send proposal to TechStart', type: 'Email', due: '4 hours', priority: 'medium', color: 'bg-memphis-orange' },
  { id: 3, title: 'Demo with Global Solutions', type: 'Meeting', due: 'Tomorrow', priority: 'high', color: 'bg-memphis-purple' },
  { id: 4, title: 'Contract review', type: 'Document', due: '2 days', priority: 'low', color: 'bg-memphis-blue' }
]

const activities = [
  { id: 1, type: 'Deal', action: 'moved to Proposal', contact: 'Acme Corp', time: '2 minutes ago', icon: Target },
  { id: 2, type: 'Contact', action: 'added new contact', contact: 'Sarah Johnson', time: '1 hour ago', icon: Users },
  { id: 3, type: 'Task', action: 'completed call with', contact: 'TechStart Inc', time: '3 hours ago', icon: Clock },
  { id: 4, type: 'Deal', action: 'created new deal for', contact: 'Innovation Labs', time: '5 hours ago', icon: Plus }
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="memphis-card bg-memphis-purple text-white p-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="flex space-x-2">
            <Triangle size={32} className="text-white" />
            <Circle size={32} className="text-white" />
            <Square size={32} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl memphis-heading text-white mb-3">
          GOOD MORNING, JOHN! 
          <Zap size={32} className="inline ml-2 text-memphis-yellow" />
        </h1>
        <p className="text-xl font-bold mb-6 uppercase tracking-wide">
          HERE'S WHAT'S HAPPENING WITH YOUR SALES TODAY
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="memphis-button bg-memphis-yellow text-black border-black">
            <Plus size={16} className="mr-2" />
            ADD DEAL
          </Button>
          <Button className="memphis-button bg-white text-black border-black">
            VIEW REPORTS
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const shapes = [Triangle, Circle, Square, Star]
          const ShapeIcon = shapes[index % shapes.length]
          
          return (
            <div key={stat.title} className={`memphis-card ${stat.bgColor} ${stat.textColor} p-6 relative overflow-hidden`}>
              {/* Background decoration */}
              <div className="absolute -top-2 -right-2 opacity-20">
                <ShapeIcon size={48} />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wide opacity-90">
                  {stat.title}
                </h3>
                <Icon size={24} className="opacity-80" />
              </div>
              
              <div className="text-3xl font-black mb-2">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <div className="text-sm font-bold uppercase">
                  {stat.change} THIS MONTH
                </div>
                <Triangle size={12} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Deals */}
        <div className="memphis-card bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl memphis-heading">RECENT DEALS</h2>
            <Button className="memphis-button bg-memphis-orange text-white border-black text-xs">
              VIEW ALL
            </Button>
          </div>
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-6">
            YOUR LATEST SALES OPPORTUNITIES
          </p>
          
          <div className="space-y-4">
            {recentDeals.map((deal) => (
              <div key={deal.id} className={`memphis-card ${deal.color} text-white p-4 flex items-center justify-between`}>
                <div className="flex-1">
                  <h4 className="font-bold text-lg uppercase">{deal.company}</h4>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className="bg-black text-white border-2 border-white font-bold text-xs uppercase">
                      {deal.stage}
                    </Badge>
                    <span className="font-bold">{deal.value}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black">{deal.probability}%</div>
                  <Progress 
                    value={deal.probability} 
                    className="w-16 h-3 border-2 border-black" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="memphis-card bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl memphis-heading">UPCOMING TASKS</h2>
            <Button className="memphis-button bg-memphis-green text-white border-black text-xs">
              VIEW ALL
            </Button>
          </div>
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-6">
            YOUR SCHEDULED ACTIVITIES
          </p>
          
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className={`memphis-card ${task.color} text-white p-4`}>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-white border-2 border-black" />
                  <div className="flex-1">
                    <h4 className="font-bold uppercase text-sm">{task.title}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <Badge className="bg-black text-white border-2 border-white font-bold text-xs uppercase">
                        {task.type}
                      </Badge>
                      <span className="text-xs font-bold flex items-center">
                        <Clock size={12} className="mr-1" />
                        {task.due}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="memphis-card bg-white p-6">
        <h2 className="text-2xl memphis-heading mb-2">RECENT ACTIVITY</h2>
        <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-6">
          LATEST UPDATES ACROSS YOUR CRM
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity, index) => {
            const colors = ['bg-memphis-pink', 'bg-memphis-cyan', 'bg-memphis-yellow', 'bg-memphis-green']
            const ActivityIcon = activity.icon
            
            return (
              <div key={activity.id} className={`memphis-card ${colors[index]} text-black p-4 flex items-center space-x-4`}>
                <div className="w-12 h-12 bg-black border-2 border-white flex items-center justify-center">
                  <ActivityIcon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm uppercase">
                    {activity.type} {activity.action}
                  </div>
                  <div className="font-black text-lg">{activity.contact}</div>
                  <div className="text-xs font-bold uppercase opacity-80">{activity.time}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}