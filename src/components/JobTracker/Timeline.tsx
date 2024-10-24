import React from 'react';
import { MessageSquare, Mail, Phone, Calendar, Send, Award, Plus } from 'lucide-react';
import { TimelineEvent } from '../../types/job';

interface TimelineProps {
  events: TimelineEvent[];
  onAddEvent: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onAddEvent }) => {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'note':
        return <MessageSquare className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'call':
        return <Phone className="h-5 w-5" />;
      case 'interview':
        return <Calendar className="h-5 w-5" />;
      case 'application':
        return <Send className="h-5 w-5" />;
      case 'offer':
        return <Award className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'note':
        return 'text-gray-600 bg-gray-100';
      case 'email':
        return 'text-blue-600 bg-blue-100';
      case 'call':
        return 'text-green-600 bg-green-100';
      case 'interview':
        return 'text-purple-600 bg-purple-100';
      case 'application':
        return 'text-indigo-600 bg-indigo-100';
      case 'offer':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events recorded yet. Add your first event to start tracking your progress.
            </div>
          ) : (
            events
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((event) => (
                <div key={event.id} className="relative pl-10">
                  <div className={`absolute left-0 p-2 rounded-full ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-gray-600 whitespace-pre-wrap">{event.description}</p>
                    )}
                    {event.outcome && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Outcome:</p>
                        <p className="text-gray-600">{event.outcome}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;