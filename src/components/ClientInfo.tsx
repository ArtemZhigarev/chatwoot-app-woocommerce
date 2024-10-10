import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';

interface ClientInfoProps {
  client: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  } | null;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  const [notes, setNotes] = useState(client?.notes || '');

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  if (!client) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <User className="h-6 w-6 text-blue-500 mr-2" />
        Client Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="flex items-center text-gray-700">
            <User className="h-5 w-5 mr-2 text-gray-500" />
            {client.name}
          </p>
          <p className="flex items-center text-gray-700 mt-2">
            <Mail className="h-5 w-5 mr-2 text-gray-500" />
            {client.email}
          </p>
          <p className="flex items-center text-gray-700 mt-2">
            <Phone className="h-5 w-5 mr-2 text-gray-500" />
            {client.phone}
          </p>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
            Conversation Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Add notes from conversations here..."
            value={notes}
            onChange={handleNotesChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;