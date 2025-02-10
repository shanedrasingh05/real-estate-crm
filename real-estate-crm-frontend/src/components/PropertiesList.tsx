// PropertiesList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<any[]>([]);
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState(0);
    const [availability, setAvailability] = useState(true);

    const fetchProperties = async () => {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
    };

    const addProperty = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/properties', { type, size, location, budget, availability });
        fetchProperties();
        setType('');
        setSize('');
        setLocation('');
        setBudget(0);
        setAvailability(true);
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <div>
            <h2>Properties</h2>
            <form onSubmit={addProperty}>
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="">Select Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                </select>
                <input placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
                <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(Number(e.target.value))} required />
                <label>
                    Available:
                    <input type="checkbox" checked={availability} onChange={() => setAvailability(!availability)} />
                </label>
                <button type="submit">Add Property</button>
            </form>
            <ul>
                {properties.map((property) => (
                    <li key={property._id}>{property.type} - {property.size} - {property.location} - ${property.budget}</li>
                ))}
            </ul>
        </div>
    );
};

export default PropertiesList;