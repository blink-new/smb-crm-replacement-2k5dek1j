import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data
const revenueData = [
  { month: 'Jan', actual: 65000, target: 60000 },
  { month: 'Feb', actual: 72000, target: 65000 },
  { month: 'Mar', actual: 68000, target: 70000 },
  { month: 'Apr', actual: 85000, target: 75000 },
  { month: 'May', actual: 92000, target: 80000 },
  { month: 'Jun', actual: 98000, target: 85000 }
]

const dealStageData = [
  { stage: 'Lead', count: 45, value: 234000 },
  { stage: 'Qualified', count: 32, value: 456000 },
  { stage: 'Proposal', count: 18, value: 324000 },
  { stage: 'Negotiation', count: 12, value: 285000 },
  { stage: 'Closed Won', count: 8, value: 198000 }
]

const activityData = [
  { name: 'Calls', value: 142, color: '#3B82F6' },
  { name: 'Emails', value: 89, color: '#10B981' },
  { name: 'Meetings', value: 67, color: '#8B5CF6' },
  { name: 'Tasks', value: 45, color: '#F59E0B' }
]

const performanceData = [
  { name: 'John Doe', deals: 12, revenue: 145000, conversion: 68 },
  { name: 'Jane Smith', deals: 8, revenue: 98000, conversion: 75 },
  { name: 'Mike Johnson', deals: 15, revenue: 167000, conversion: 62 },
  { name: 'Sarah Wilson', deals: 6, revenue: 78000, conversion: 82 }
]

const kpis = [
  {
    title: 'Revenue This Month',
    value: '$98,000',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'New Contacts',
    value: '284',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Deals Closed',
    value: '18',
    change: '-3.1%',
    trend: 'down',
    icon: Target,
    color: 'text-purple-600'
  },
  {
    title: 'Avg Deal Size',
    value: '$5,444',
    change: '+15.7%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your sales performance and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Date Range
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown
          return (
            <Card key={kpi.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <Icon size={20} className={kpi.color} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className={`flex items-center text-xs ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon size={12} className="mr-1" />
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target</CardTitle>
            <CardDescription>Monthly performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Actual Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#94A3B8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deal Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Analysis</CardTitle>
            <CardDescription>Deals by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'count' ? value : `$${value.toLocaleString()}`,
                  name === 'count' ? 'Deals' : 'Value'
                ]} />
                <Legend />
                <Bar dataKey="count" fill="#3B82F6" name="Deal Count" />
                <Bar dataKey="value" fill="#8B5CF6" name="Pipeline Value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>Breakdown of sales activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual sales metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((person) => (
                <div key={person.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{person.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{person.deals} deals</span>
                      <span>${person.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={`${
                        person.conversion >= 70 
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : person.conversion >= 60
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          : 'bg-red-100 text-red-700 border-red-200'
                      }`}
                    >
                      {person.conversion}% conversion
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-powered sales insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-blue-900">Strong Q2 Performance</h4>
                <p className="text-blue-700 text-sm">
                  Revenue is up 23% compared to Q1, with a significant improvement in deal closure rate.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-yellow-900">Pipeline Opportunity</h4>
                <p className="text-yellow-700 text-sm">
                  18 deals in the Proposal stage need follow-up within the next 5 days to maintain momentum.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <h4 className="font-medium text-green-900">Team Achievement</h4>
                <p className="text-green-700 text-sm">
                  Sarah Wilson has the highest conversion rate at 82% - consider sharing her best practices.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}