import React, { useEffect, useState } from 'react';
import { getIncidents, createIncident, updateIncident, deleteIncident } from '../services/api';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({ status: '', job: '', description: '', image_url: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getIncidents(token);
      setIncidents(response.data);
    } catch (error) {
      console.error('Failed to fetch incidents:', error);
      setError('Failed to fetch incidents. Please try again.');
    }
  };

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await createIncident({
        status: newIncident.status,
        job: newIncident.job,
        description: newIncident.description,
        image_url: newIncident.image_url,
      }, token);
  
      setNewIncident({ status: '', job: '', description: '', image_url: '' });
      fetchIncidents(); 
    } catch (error) {
      console.error('Failed to create incident:', error);
      setError('Failed to create incident. Please try again.');
    }
  };
  
  const handleUpdateIncident = async (id, updatedIncidentData) => {
    try {
      const token = localStorage.getItem('token');
      await updateIncident(id, updatedIncidentData, token);
      fetchIncidents(); 
    } catch (error) {
      console.error('Failed to update incident:', error);
      setError('Failed to update incident. Please try again.');
    }
  };
  
  const handleDeleteIncident = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await deleteIncident(id, token);
      fetchIncidents(); 
    } catch (error) {
      console.error('Failed to delete incident:', error);
      setError('Failed to delete incident. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleCreateIncident} className="mb-4">
        <h2 className="text-xl font-bold mb-2">Report New Incident</h2>
        <div className="mb-2">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newIncident.status}
            onChange={(e) => setNewIncident({ ...newIncident, status: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Job</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newIncident.job}
            onChange={(e) => setNewIncident({ ...newIncident, job: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={newIncident.description}
            onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Report</button>
      </form>
      <h2 className="text-xl font-bold mb-2">Incidents</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Status</th>
            <th className="border p-2">Job</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident.id}>
              <td className="border p-2">{incident.status}</td>
              <td className="border p-2">{incident.job}</td>
              <td className="border p-2">{incident.description}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white p-1 rounded"
                  onClick={() => handleUpdateIncident(incident.id, { status: 'Updated Status' })} 
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded ml-2"
                  onClick={() => handleDeleteIncident(incident.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
