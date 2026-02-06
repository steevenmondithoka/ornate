import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [loading, setLoading] = useState(false);

  // Function to get the latest token from storage
  const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('https://ornate-evkf.onrender.com/api/admins/all', getAuthHeader());
      setAdmins(res.data);
    } catch (err) { 
        console.error("Fetch Admins Error:", err.response?.data);
        if(err.response?.status === 403) alert("SuperAdmin Access Only!");
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://ornate-evkf.onrender.com/api/admins/add', formData, getAuthHeader());
      setFormData({ name: '', email: '', password: '', role: 'admin' });
      fetchAdmins();
      alert("Admin added!");
    } catch (err) { 
        alert(err.response?.data?.message || "Error adding admin"); 
    }
    setLoading(false);
  };

const handleDelete = async (id) => {
  // 1. Prevent the Super Admin from deleting themselves!
  const currentAdmin = JSON.parse(localStorage.getItem('adminInfo'));
  if (id === currentAdmin.id) {
    alert("Security Error: You cannot delete your own account.");
    return;
  }

  if (window.confirm("Are you sure? This admin will lose all access immediately.")) {
    try {
      // 2. Get fresh token to avoid "Token expired/failed" errors
      const token = localStorage.getItem('adminToken');
      const freshConfig = { 
        headers: { Authorization: `Bearer ${token}` } 
      };

      await axios.delete(`https://ornate-evkf.onrender.com/api/admins/${id}`, freshConfig);
      
      // 3. Update the UI list
      fetchAdmins(); 
      alert("Staff member removed successfully.");

    } catch (err) {
      console.error("Delete Error:", err);
      // 4. Handle specific error messages from your backend
      const errorMsg = err.response?.data?.message || "Server Error: Could not delete admin.";
      alert(errorMsg);
    }
  }
};

  return (
    <div className="pt-32 px-10 min-h-screen bg-[#030014]">
      <h1 className="text-4xl font-bold text-white mb-10">Admin Control Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="glass-morphism p-8 rounded-3xl border border-white/10 h-fit">
          <h2 className="text-xl text-violet-400 mb-6">Add New Administrator</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white" type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white" type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            <select className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="admin" className="bg-[#030014]">Admin</option>
              <option value="superadmin" className="bg-[#030014]">Super Admin</option>
            </select>
            <button className="w-full py-3 bg-violet-600 rounded-xl font-bold hover:bg-violet-500 transition">
              {loading ? "Processing..." : "Create Admin"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 glass-morphism p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl text-white mb-6">Existing Staff</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {admins.map(admin => (
                  <tr key={admin._id} className="text-white">
                    <td className="py-4">
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-xs text-gray-500">{admin.email}</div>
                    </td>
                    <td className="py-4 text-sm uppercase tracking-tighter">{admin.role}</td>
                    <td className="py-4">
                      <button onClick={() => handleDelete(admin._id)} className="text-red-400 hover:text-red-300 text-sm font-bold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;