import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin,
  Building2,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data
const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@acmecorp.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    position: 'Marketing Director',
    location: 'New York, NY',
    status: 'Hot Lead',
    lastContact: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'mike@techstart.io',
    phone: '+1 (555) 987-6543',
    company: 'TechStart Inc',
    position: 'CEO',
    location: 'San Francisco, CA',
    status: 'Qualified',
    lastContact: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily@globalsol.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Solutions',
    position: 'VP of Sales',
    location: 'Austin, TX',
    status: 'Nurturing',
    lastContact: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@innovlabs.com',
    phone: '+1 (555) 321-0987',
    company: 'Innovation Labs',
    position: 'CTO',
    location: 'Seattle, WA',
    status: 'Cold Lead',
    lastContact: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa@designco.com',
    phone: '+1 (555) 654-3210',
    company: 'Design Co',
    position: 'Design Lead',
    location: 'Los Angeles, CA',
    status: 'Hot Lead',
    lastContact: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Hot Lead': return 'bg-red-100 text-red-700 border-red-200'
    case 'Qualified': return 'bg-green-100 text-green-700 border-green-200'
    case 'Nurturing': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'Cold Lead': return 'bg-gray-100 text-gray-700 border-gray-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase()) ||
      contact.email.toLowerCase().includes(value.toLowerCase()) ||
      contact.company.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredContacts(filtered)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your contacts and companies</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus size={16} className="mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search contacts, companies, or emails..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">2,847</div>
          <div className="text-sm text-gray-600">Total Contacts</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">156</div>
          <div className="text-sm text-gray-600">Hot Leads</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">94</div>
          <div className="text-sm text-gray-600">Qualified</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">284</div>
          <div className="text-sm text-gray-600">Companies</div>
        </div>
      </div>

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            All Contacts ({filteredContacts.length})
            <Button variant="outline" size="sm">
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Avatar>
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                    <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Building2 size={12} className="mr-1" />
                      {contact.company} • {contact.position}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Mail size={12} className="mr-1" />
                      {contact.email}
                    </span>
                    <span className="flex items-center">
                      <Phone size={12} className="mr-1" />
                      {contact.phone}
                    </span>
                    <span className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {contact.location}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">Last contact</div>
                  <div className="text-sm font-medium">{contact.lastContact}</div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye size={16} className="mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit size={16} className="mr-2" />
                      Edit Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </DropdownMenuItem>
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