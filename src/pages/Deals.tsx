import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  Filter, 
  DollarSign,
  Calendar,
  User,
  MoreHorizontal,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data
const pipelineStages = [
  { name: 'Lead', deals: 12, value: 156000 },
  { name: 'Qualified', deals: 8, value: 248000 },
  { name: 'Proposal', deals: 6, value: 324000 },
  { name: 'Negotiation', deals: 4, value: 185000 },
  { name: 'Closed Won', deals: 3, value: 125000 }
]

const deals = [
  {
    id: 1,
    title: 'Enterprise Software License',
    company: 'Acme Corp',
    value: 45000,
    probability: 75,
    stage: 'Proposal',
    closeDate: '2024-02-15',
    owner: 'John Doe',
    contact: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face',
    lastActivity: '2 hours ago'
  },
  {
    id: 2,
    title: 'Cloud Migration Services',
    company: 'TechStart Inc',
    value: 28500,
    probability: 90,
    stage: 'Negotiation',
    closeDate: '2024-02-10',
    owner: 'Jane Smith',
    contact: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastActivity: '1 day ago'
  },
  {
    id: 3,
    title: 'Annual Support Contract',
    company: 'Global Solutions',
    value: 65000,
    probability: 60,
    stage: 'Qualified',
    closeDate: '2024-02-20',
    owner: 'Mike Johnson',
    contact: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastActivity: '3 days ago'
  },
  {
    id: 4,
    title: 'Custom Development',
    company: 'Innovation Labs',
    value: 125000,
    probability: 40,
    stage: 'Lead',
    closeDate: '2024-03-01',
    owner: 'Sarah Wilson',
    contact: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastActivity: '1 week ago'
  }
]

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'Lead': return 'bg-gray-100 text-gray-700 border-gray-200'
    case 'Qualified': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'Proposal': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'Negotiation': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'Closed Won': return 'bg-green-100 text-green-700 border-green-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

const getPriorityColor = (probability: number) => {
  if (probability >= 80) return 'text-green-600'
  if (probability >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export default function Deals() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)

  const filteredDeals = selectedStage 
    ? deals.filter(deal => deal.stage === selectedStage)
    : deals

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600">Track your sales pipeline and opportunities</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus size={16} className="mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Target className="text-blue-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">{deals.length}</div>
              <div className="text-sm text-gray-600">Active Deals</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <DollarSign className="text-green-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">${(totalValue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Pipeline Value</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-purple-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">${(weightedValue / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Weighted Value</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <Clock className="text-orange-600" size={20} />
            <div>
              <div className="text-2xl font-bold text-gray-900">42</div>
              <div className="text-sm text-gray-600">Days Avg. Cycle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pipelineStages.map((stage) => (
              <div
                key={stage.name}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedStage === stage.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.name ? null : stage.name)}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{stage.deals}</div>
                  <div className="text-sm text-gray-600 mb-2">{stage.name}</div>
                  <div className="text-sm font-medium text-green-600">
                    ${(stage.value / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deals List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {selectedStage ? `${selectedStage} Deals` : 'All Deals'} ({filteredDeals.length})
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Avatar>
                  <AvatarImage src={deal.avatar} alt={deal.contact} />
                  <AvatarFallback>{deal.contact.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{deal.title}</h3>
                    <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <User size={12} className="mr-1" />
                      {deal.company} • {deal.contact}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      Close: {new Date(deal.closeDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Owner: {deal.owner} • Last activity: {deal.lastActivity}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ${deal.value.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={deal.probability} className="w-16 h-2" />
                    <span className={`text-sm font-medium ${getPriorityColor(deal.probability)}`}>
                      {deal.probability}%
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Activity</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Deal</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}