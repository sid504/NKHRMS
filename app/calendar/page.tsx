'use client'

import { useState } from 'react'
import { 
  Calendar,
  Plus,
  Search,
  Filter,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('month')
  const [showEventModal, setShowEventModal] = useState(false)

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      type: 'meeting',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Sarah Wilson', 'Mike Johnson'],
      description: 'Weekly team sync meeting to discuss project progress and upcoming tasks.',
      isOnline: false
    },
    {
      id: 2,
      title: 'Client Presentation',
      type: 'presentation',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Zoom Meeting',
      attendees: ['John Doe', 'Alice Brown', 'Client Team'],
      description: 'Present quarterly results to the client team.',
      isOnline: true
    },
    {
      id: 3,
      title: 'Performance Review',
      type: 'review',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '45 minutes',
      location: 'Office',
      attendees: ['John Doe', 'David Lee'],
      description: 'Annual performance review meeting.',
      isOnline: false
    },
    {
      id: 4,
      title: 'Training Session',
      type: 'training',
      date: '2024-01-18',
      time: '3:00 PM',
      duration: '1.5 hours',
      location: 'Training Room',
      attendees: ['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Alice Brown'],
      description: 'New software training session for the team.',
      isOnline: false
    }
  ]

  const eventTypes = [
    { id: 'all', label: 'All Events', color: 'bg-gray-500' },
    { id: 'meeting', label: 'Meetings', color: 'bg-blue-500' },
    { id: 'presentation', label: 'Presentations', color: 'bg-purple-500' },
    { id: 'review', label: 'Reviews', color: 'bg-green-500' },
    { id: 'training', label: 'Training', color: 'bg-orange-500' }
  ]

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes.find(et => et.id === type)
    return eventType ? eventType.color : 'bg-gray-500'
  }

  const getEventTypeLabel = (type: string) => {
    const eventType = eventTypes.find(et => et.id === type)
    return eventType ? eventType.label : 'Event'
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-600">Manage your schedule and events</p>
        </div>
        <button
          onClick={() => setShowEventModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={previousMonth}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                view === 'month' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                view === 'week' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                view === 'day' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Day
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 p-3 text-center">
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </div>
          ))}
          
          {/* Calendar Days */}
          {days.map((day, index) => (
            <div
              key={index}
              className={`bg-white min-h-[120px] p-2 ${
                day ? 'hover:bg-gray-50 cursor-pointer' : ''
              }`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(day) 
                      ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                      : isSelected(day)
                      ? 'text-blue-600'
                      : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDate(day).slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)} text-white`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {getEventsForDate(day).length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{getEventsForDate(day).length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Events */}
      {getEventsForDate(selectedDate).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Events for {formatDate(selectedDate)}
          </h3>
          <div className="space-y-4">
            {getEventsForDate(selectedDate).map(event => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time} • {event.duration}
                      </div>
                      <div className="flex items-center">
                        {event.isOnline ? (
                          <Video className="h-4 w-4 mr-2" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-2" />
                        )}
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees.length} attendees
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter(event => new Date(event.date) > new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} • {event.time}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Event Type Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {eventTypes.slice(1).map(type => (
            <div key={type.id} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
              <span className="text-sm text-gray-700">{type.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 