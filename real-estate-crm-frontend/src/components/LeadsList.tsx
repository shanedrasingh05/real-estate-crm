// LeadsList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeadsList: React.FC = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const fetchLeads = async () => {
        const response = await axios.get('http://localhost:5000/api/leads');
        setLeads(response.data);
    };

    const addLead = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/leads', { name, phone });
        fetchLeads();
        setName('');
        setPhone('');
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div>
            <h2>Leads</h2>
            <form onSubmit={addLead}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <button type="submit">Add Lead</button>
            </form>
            <ul>
                {leads.map((lead) => (
                    <li key={lead._id}>{lead.name} - {lead.phone}</li>
                ))}
            </ul>
        </div>
    );
};

export default LeadsList;