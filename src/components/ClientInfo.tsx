import { useState, useEffect, useCallback, memo } from 'react';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import type { ClientInfo as ClientInfoType } from '../types';

interface ClientInfoProps {
  client: ClientInfoType | null;
}

const ClientInfo: React.FC<ClientInfoProps> = memo(({ client }) => {
  const [notes, setNotes] = useState(client?.notes || '');

  // Sync notes when client changes
  useEffect(() => {
    setNotes(client?.notes || '');
  }, [client]);

  const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  }, []);

  if (!client) return null;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <User className="h-6 w-6 text-blue-500 mr-2" aria-hidden="true" />
        Client Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="flex items-center text-gray-700">
            <User className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
            <span className="sr-only">Name: </span>
            {client.name}
          </p>
          <p className="flex items-center text-gray-700 mt-2">
            <Mail className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
            <span className="sr-only">Email: </span>
            <a href={`mailto:${client.email}`} className="hover:text-blue-600 transition-colors">
              {client.email}
            </a>
          </p>
          <p className="flex items-center text-gray-700 mt-2">
            <Phone className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
            <span className="sr-only">Phone: </span>
            <a href={`tel:${client.phone}`} className="hover:text-blue-600 transition-colors">
              {client.phone}
            </a>
          </p>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
            Conversation Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            placeholder="Add notes from conversations here..."
            value={notes}
            onChange={handleNotesChange}
            aria-label="Conversation notes for this client"
          />
        </div>
      </div>
    </div>
  );
});

ClientInfo.displayName = 'ClientInfo';

export default ClientInfo;