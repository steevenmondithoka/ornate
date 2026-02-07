import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, Image as ImageIcon, Video,
    Users, Calendar, LogOut, Check, X, Play, LayoutDashboard,
    Download, Megaphone, Shirt, GraduationCap,
    PlusCircle, FileText, // Added FileText icon for Registrations tab
    Building,
    Mail,
    Phone,
    User,
    ChevronRight,
    Zap
} from 'lucide-react';


import * as XLSX from 'xlsx';

const API_BASE = "https://ornate-evkf.onrender.com/api";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('events');
    const [loading, setLoading] = useState(false);
    const [adminInfo, setAdminInfo] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
    const [message, setMessage] = useState('');
    const [showEventForm, setShowEventForm] = useState(false);

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('adminInfo'));
        setAdminInfo(info);
    }, []);

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            const res = await axios.post('https://ornate-evkf.onrender.com/api/admins/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(res.data.message);
            setFormData({ name: '', email: '', password: '', role: 'admin' }); // Reset form
        } catch (err) {
            setMessage(err.response?.data?.message || "Error adding admin");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this admin?")) {
            try {
                await axios.delete(`https://ornate-evkf.onrender.com/api/admins/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchAdmins(); // Refresh the list after deleting
            } catch (err) {
                alert(err.response?.data?.message || "Delete failed");
            }
        }
    };

    // Data States
    const [events, setEvents] = useState([]);
    const [stalls, setStalls] = useState([]);
    const [galleryItems, setGalleryItems] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [tshirts, setTshirts] = useState([]);
    const [alumniRegistrations, setAlumniRegistrations] = useState([]);
    const [allRegistrations, setAllRegistrations] = useState([]); // NEW STATE for all registrations
    const [allAdmins, setAllAdmins] = useState([]);
    // Form States
    const [eventForm, setEventForm] = useState({
        name: '',
        dept: 'cse',
        date: '2026-03-28',
        time: '',
        venue: '',
        description: '',
        tagline: '',
        imageUrl: '',
        rules: [],
        judgingCriteria: '',
        fee: 0,
        teamSize: 'Individual',
        contactPerson: '',
        contactNumber: '',
        registrationOpen: true,
        registrationDeadline: '',
    });
    const [galleryForm, setGalleryForm] = useState({
        type: 'photo', caption: '', youtubeUrl: '', year: 2026
    });
    const [updateText, setUpdateText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    // --- STALL LOGIC ---
    const updateStallStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.patch(`${API_BASE}/stalls/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
            alert(`Stall marked as ${status}`);
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    const deleteStall = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this application?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/stalls/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to delete application");
        }
    };

    const downloadTShirtExcel = () => {
        const dataToExport = tshirts.map(t => ({
            "Name": t.name,
            "USN": t.usn,
            "Dept": t.department,
            "Size": t.size,
            "Phone": t.phone,
            "Status": t.status,
            "Date": new Date(t.createdAt).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "TShirtOrders");
        XLSX.writeFile(workbook, "TShirt_Orders.xlsx");
    };

    const downloadStallExcel = () => {
        const dataToExport = stalls.map(s => ({
            "Applicant Name": s.applicantName,
            "College": s.college,
            "Email": s.email,
            "Phone": s.phone,
            "Stall Type": s.stallType,
            "Description": s.description,
            "Status": s.status,
            "Applied On": new Date(s.createdAt).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StallApplicants");
        XLSX.writeFile(workbook, "Ornate_2k26_Stall_Registrations.xlsx");
    };

    const downloadAlumniExcel = () => {
        const dataToExport = alumniRegistrations.map(a => ({
            "Full Name": a.fullName,
            "Email": a.email,
            "Phone Number": a.phoneNumber,
            "Passing Year": a.passingYear,
            "Branch": a.branch,
            "Occupation": a.currentOccupation || 'N/A',
            "Company": a.companyName || 'N/A',
            "Attending Fest": a.attendFest === 'yes' ? 'Yes' : 'No',
            "Conducting Event": a.conductEvent === 'yes' ? 'Yes' : 'No',
            "Event Idea": a.eventIdea || 'N/A',
            "Event Idea Status": a.eventIdeaStatus,
            "Registered On": new Date(a.createdAt).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "AlumniRegistrations");
        XLSX.writeFile(workbook, "Alumni_Registrations.xlsx");
    };

    // --- NEW: Registrations Excel Export ---
    const downloadRegistrationsExcel = (dataToExport, fileName) => {
        const formattedData = dataToExport.map(reg => {
            const teamMembersString = reg.teamMembers?.map(m => `${m.name} (${m.email || 'N/A'})`).join('; ') || 'N/A';
            return {
                "Event Name": reg.eventId?.name || 'Unknown',
                "Participant Name": reg.name,
                "Email": reg.email,
                "Phone": reg.phone,
                "College": reg.college,
                "Dept": reg.department,
                "Year": reg.year,
                "Team Name": reg.teamName || 'N/A',
                "Team Members": teamMembersString,
                "Payment Status": reg.paymentStatus,
                "Fee Paid": reg.feePaid,
                "Date": new Date(reg.registeredAt).toLocaleDateString(),
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
        XLSX.writeFile(workbook, `${fileName}_${new Date().toLocaleDateString()}.xlsx`);
    };
    // --- END: NEW Registrations Excel Export ---

    // --- INITIAL FETCH ---
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin-gate');
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { Authorization: `Bearer ${token}` };

            // Use individual requests or check for registrations specifically
            const regRes = await axios.get(`${API_BASE}/registrations/all`, { headers });
            setAllRegistrations(regRes.data);

            // Fetch the rest of the data
            const [resEvents, resStalls, resGallery, resUpdates, resTshirts, resAlumni] = await Promise.all([
                axios.get(`${API_BASE}/events`),
                axios.get(`${API_BASE}/stalls/admin`, { headers }),
                axios.get(`${API_BASE}/gallery`),
                axios.get(`${API_BASE}/updates`),
                axios.get(`${API_BASE}/tshirts`),
                axios.get(`${API_BASE}/alumni-registrations`, { headers }),
            ]);

            setEvents(resEvents.data);
            setStalls(resStalls.data);
            setGalleryItems(resGallery.data);
            setUpdates(resUpdates.data);
            setTshirts(resTshirts.data);
            setAlumniRegistrations(resAlumni.data);

        } catch (err) {
            console.error("Error fetching admin data:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateTShirtStatus = async (id, status) => {
        try {
            await axios.patch(`${API_BASE}/tshirts/${id}/status`, { status });
            fetchData();
        } catch (e) { alert("Error updating status"); }
    };

    const deleteTShirt = async (id) => {
        if (!confirm("Delete this order?")) return;
        try {
            await axios.delete(`${API_BASE}/tshirts/${id}`);
            fetchData();
        } catch (e) { alert("Error deleting order"); }
    };

    const updateAlumniEventIdeaStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.patch(`${API_BASE}/alumni-registrations/${id}/event-status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
            alert(`Alumni event idea marked as ${status}`);
        } catch (err) {
            console.error(err);
            alert("Failed to update event idea status");
        }
    };

    const deleteAlumniRegistration = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this alumni registration?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/alumni-registrations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to delete alumni registration");
        }
    };

    // --- NEW: Registration Management Actions ---
    const deleteRegistration = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this event registration?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/registrations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
            alert("Registration deleted successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to delete registration");
        }
    };

    const updateRegistrationPaymentStatus = async (id, status) => {
        if (!window.confirm(`Mark this registration as ${status}?`)) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.patch(`${API_BASE}/registrations/${id}/payment-status`, { paymentStatus: status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
            alert(`Registration payment marked as ${status}!`);
        } catch (err) {
            console.error(err);
            alert("Failed to update payment status");
        }
    };
    // --- END: NEW Registration Management Actions ---


    // --- LOGOUT ---
    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin-gate');
    };

    // --- EVENT HANDLERS ---
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`${API_BASE}/events`, eventForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEventForm({
                name: '', dept: 'cse', date: '2026-03-28', time: '', venue: '', description: '',
                tagline: '', imageUrl: '', rules: [], judgingCriteria: '', fee: 0,
                teamSize: 'Individual', contactPerson: '', contactNumber: '', registrationOpen: true, registrationDeadline: '',
            });
            fetchData();
            alert("Event Published Successfully!");
        } catch (err) {
            alert("Error: Date field is required or server is down. Check all fields.");
        } finally { setLoading(false); }
    };

    const deleteEvent = async (id) => {
        if (!window.confirm("Permanent delete this event?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) { alert("Failed to delete event"); }
    };

    // --- GALLERY HANDLERS ---
    const handleGallerySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        const formData = new FormData();
        formData.append('type', galleryForm.type);
        formData.append('caption', galleryForm.caption);
        formData.append('year', galleryForm.year);

        if (galleryForm.type === 'photo') {
            formData.append('image', selectedFile);
        } else {
            formData.append('youtubeUrl', galleryForm.youtubeUrl);
        }

        try {
            await axios.post(`${API_BASE}/gallery`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setGalleryForm({ type: 'photo', caption: '', youtubeUrl: '', year: 2026 });
            setSelectedFile(null);
            fetchData();
            alert("Media Archived!");
        } catch (err) { alert("Error uploading media"); }
        finally { setLoading(false); }
    };

    const deleteGalleryItem = async (id) => {
        if (!window.confirm("Permanent delete this media?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) { alert("Failed to delete media"); }
    };

    // --- UPDATE TICKER HANDLERS ---
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!updateText.trim()) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`${API_BASE}/updates`, { text: updateText }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUpdateText("");
            fetchData();
        } catch (err) {
            alert("Error adding update");
        } finally {
            setLoading(false);
        }
    };

    const deleteUpdate = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE}/updates/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            alert("Error deleting update");
        }
    };

    const toggleRegistrationStatus = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.patch(`${API_BASE}/events/${id}/registration-status`,
                { registrationOpen: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData(); // Refresh the list
            alert(`Registration ${!currentStatus ? 'Opened' : 'Closed'} successfully!`);
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    const getEventIdeaStatusClass = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-500/20 text-green-500';
            case 'Rejected': return 'bg-red-500/20 text-red-500';
            case 'Pending':
            default: return 'bg-amber-500/20 text-amber-500';
        }
    };

    const getPaymentStatusClass = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-500/20 text-green-500';
            case 'failed': return 'bg-red-500/20 text-red-500';
            case 'pending':
            default: return 'bg-amber-500/20 text-amber-500';
        }
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [activeRegSubTab, setActiveRegSubTab] = useState('All');

    return (
        <div className="min-h-screen bg-[#030014] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <p className="text-violet-500 font-mono tracking-widest text-[10px] uppercase">Fest Management</p>
                        <h1 className="text-5xl font-medium tracking-tighter italic text-reveal">Dashboard.</h1>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 border border-red-500/20 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition">
                        <LogOut size={14} /> End Session
                    </button>
                </div>

                {/* Tab Nav */}
                <div className="flex gap-8 border-b border-white/5 mb-12 overflow-x-auto pb-2">
                    {[
                        { id: 'events', label: 'Arenas', icon: <Calendar size={14} /> },
                        { id: 'registrations', label: 'Registrations', icon: <FileText size={14} /> }, // NEW TAB
                        { id: 'gallery', label: 'Media Library', icon: <ImageIcon size={14} /> },
                        { id: 'updates', label: 'Live Ticker', icon: <Megaphone size={14} /> },
                        { id: 'stalls', label: 'Stall Auction Requests', icon: <Users size={14} /> },
                        { id: 'tshirts', label: 'Tshirt Orders', icon: <Shirt size={14} /> },
                        { id: 'alumni', label: 'Alumni Registrations', icon: <GraduationCap size={14} /> },

                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-violet-500 border-b-2 border-violet-500' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">

                    {/* --- EVENTS TAB --- */}
                  {activeTab === 'events' && (
    <motion.div 
        key="events" 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0 }} 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
    >
        {/* Form Container */}
        <div className="lg:col-span-1">
            {/* Mobile Toggle Button - Only shows on small screens */}
            <button 
                onClick={() => setShowEventForm(!showEventForm)}
                className="lg:hidden w-full mb-4 p-4 bg-violet-600 rounded-2xl font-bold flex items-center justify-between"
            >
                {showEventForm ? "Close Form" : "Create New Event"}
                <ChevronRight className={`transition-transform ${showEventForm ? 'rotate-90' : ''}`} size={20} />
            </button>

            <div className={`
                ${showEventForm ? 'block' : 'hidden'} lg:block 
                glass-morphism p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] 
                border border-white/5 
                lg:sticky lg:top-32 h-auto lg:h-fit z-20
            `}>
                <h2 className="text-xl font-bold italic mb-6 text-violet-500 flex items-center gap-2">
                    <Zap size={20} /> Create Event
                </h2>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <input className="admin-input" placeholder="Event Name" value={eventForm.name} onChange={e => setEventForm({ ...eventForm, name: e.target.value })} required />
                        
                        <div className="grid grid-cols-2 gap-2">
                            <select className="admin-input text-xs" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })}>
                                <option value="2026-03-28">March 28</option>
                                <option value="2026-03-29">March 29</option>
                                <option value="2026-03-30">March 30</option>
                            </select>
                            <select className="admin-input text-xs" value={eventForm.dept} onChange={e => setEventForm({ ...eventForm, dept: e.target.value })}>
                                <option value="all">General</option>
                                <option value="cse">CSE</option>
                                <option value="mech">Mech</option>
                                <option value="ece">ECE</option>
                                <option value="eee">EEE</option>
                                <option value="civil">Civil</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <input className="admin-input" placeholder="Time" value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} required />
                            <input className="admin-input" placeholder="Venue" value={eventForm.venue} onChange={e => setEventForm({ ...eventForm, venue: e.target.value })} required />
                        </div>

                        <textarea className="admin-input h-20 text-sm" placeholder="Description" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="admin-input" placeholder="Fee (₹)" type="number" value={eventForm.fee} onChange={e => setEventForm({ ...eventForm, fee: parseFloat(e.target.value) || 0 })} />
                            <input className="admin-input" placeholder="Team Size" value={eventForm.teamSize} onChange={e => setEventForm({ ...eventForm, teamSize: e.target.value })} />
                        </div>

                        <textarea className="admin-input h-20 text-sm" placeholder="Rules (comma-separated)" value={eventForm.rules.join(', ')} onChange={e => setEventForm({ ...eventForm, rules: e.target.value.split(',').map(s => s.trim()) })} />
                        
                        <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 accent-violet-600" checked={eventForm.registrationOpen} onChange={e => setEventForm({ ...eventForm, registrationOpen: e.target.checked })} />
                                Registration Open
                            </label>
                            <input className="admin-input !bg-black/40" type="date" value={eventForm.registrationDeadline ? eventForm.registrationDeadline.substring(0, 10) : ''} onChange={e => setEventForm({ ...eventForm, registrationDeadline: e.target.value })} />
                        </div>
                    </div>

                    <button disabled={loading} className="admin-btn-primary w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px]">
                        {loading ? "Publishing..." : "Publish Event"}
                    </button>
                </form>
            </div>
        </div>

        {/* List Container */}
        <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Manage Events ({events.length})</h3>
            </div>
            {events.map(ev => (
                <div key={ev._id} className={`p-5 md:p-6 glass-morphism rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group transition-all ${ev.registrationOpen ? 'border-white/5' : 'border-red-500/20 opacity-80'}`}>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-violet-500 text-[9px] font-bold uppercase tracking-widest bg-violet-500/10 px-2 py-0.5 rounded-full">{ev.dept}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${ev.registrationOpen ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                {ev.registrationOpen ? 'Live' : 'Closed'}
                            </span>
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-white group-hover:text-violet-400 transition-colors">{ev.name}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <p className="text-[10px] text-gray-500 flex items-center gap-1"><Calendar size={12}/> {ev.date}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={12}/> {ev.time}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin size={12}/> {ev.venue}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                        <button
                            onClick={() => toggleRegistrationStatus(ev._id, ev.registrationOpen)}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${ev.registrationOpen ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'}`}
                        >
                            {ev.registrationOpen ? <X size={14} /> : <Check size={14} />}
                            {ev.registrationOpen ? 'Close' : 'Open'}
                        </button>

                        <button 
                            onClick={() => deleteEvent(ev._id)} 
                            className="p-3 bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
)}

                    {/* --- REGISTRATIONS TAB --- */}
                    {/* --- REGISTRATIONS TAB (WITH SUB-TABS) --- */}
                    {/* --- REGISTRATIONS TAB (SEARCH + TABS + SMART EXPORT) --- */}
                    {activeTab === 'registrations' && (
                        <motion.div key="registrations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

                            {/* Header & Search Section */}
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                                <div className="flex-grow w-full max-w-xl relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Users size={18} className="text-gray-500 group-focus-within:text-violet-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by Name, Email, or Phone..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="admin-input !pl-12 !py-4 shadow-2xl shadow-black/50 border-white/5 focus:border-violet-500/50"
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        const filteredData = allRegistrations.filter(reg => {
                                            const matchesTab = activeRegSubTab === 'All' || reg.eventId?.name === activeRegSubTab;
                                            const matchesSearch =
                                                reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                reg.phone.includes(searchTerm);
                                            return matchesTab && matchesSearch;
                                        });
                                        downloadRegistrationsExcel(filteredData, `Ornate_Registrations_${activeRegSubTab}`);
                                    }}
                                    className="flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-500 transition-all shadow-xl shadow-violet-900/20 w-full lg:w-auto justify-center"
                                >
                                    <Download size={14} /> Export {activeRegSubTab} List
                                </button>
                            </div>

                            {/* Dynamic Sub-Tabs (Pills) */}
                            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
                                <button
                                    onClick={() => setActiveRegSubTab('All')}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeRegSubTab === 'All' ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40' : 'bg-white/5 text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    All ({allRegistrations.length})
                                </button>
                                {[...new Set(allRegistrations.map(r => r.eventId?.name))].filter(Boolean).map(eventName => (
                                    <button
                                        key={eventName}
                                        onClick={() => setActiveRegSubTab(eventName)}
                                        className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeRegSubTab === eventName ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40' : 'bg-white/5 text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        {eventName} ({allRegistrations.filter(r => r.eventId?.name === eventName).length})
                                    </button>
                                ))}
                            </div>

                            {/* Filtered Content Area */}
                            <div className="grid gap-4">
                                {allRegistrations
                                    .filter(reg => {
                                        const matchesTab = activeRegSubTab === 'All' || reg.eventId?.name === activeRegSubTab;
                                        const matchesSearch =
                                            reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            reg.phone.includes(searchTerm);
                                        return matchesTab && matchesSearch;
                                    })
                                    .map((reg) => (
                                        <motion.div
                                            layout
                                            key={reg._id}
                                            className="p-8 glass-morphism rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-violet-500/30 transition-all relative overflow-hidden"
                                        >
                                            <div className="flex-grow w-full">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${getPaymentStatusClass(reg.paymentStatus)}`}>
                                                        {reg.paymentStatus}
                                                    </span>
                                                    <span className="text-violet-500 text-[9px] font-black uppercase tracking-widest">
                                                        {reg.eventId?.name || 'Unlinked Event'}
                                                    </span>
                                                </div>

                                                <h4 className="text-xl font-bold text-white mb-2">{reg.name}</h4>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-gray-400 text-xs">
                                                    <p className="flex items-center gap-2"><Mail size={12} className="text-violet-500" /> {reg.email}</p>
                                                    <p className="flex items-center gap-2"><Phone size={12} className="text-violet-500" /> {reg.phone}</p>
                                                    <p className="flex items-center gap-2"><Building size={12} className="text-violet-500" /> {reg.college}</p>
                                                </div>

                                                {reg.teamName && (
                                                    <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-1">Team: {reg.teamName}</p>
                                                            <p className="text-[10px] text-gray-500">Includes {reg.teamMembers?.length} additional members</p>
                                                        </div>
                                                        <div className="flex -space-x-2">
                                                            {[...Array(Math.min(reg.teamMembers?.length + 1, 4))].map((_, i) => (
                                                                <div key={i} className="w-6 h-6 rounded-full bg-violet-900 border border-white/20 flex items-center justify-center text-[8px] font-bold">
                                                                    <User size={10} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 w-full md:w-auto border-t md:border-t-0 border-white/5">
                                                {reg.paymentStatus === 'pending' && (
                                                    <>
                                                        <button onClick={() => updateRegistrationPaymentStatus(reg._id, 'paid')} className="p-4 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all">
                                                            <Check size={20} />
                                                        </button>
                                                        <button onClick={() => updateRegistrationPaymentStatus(reg._id, 'failed')} className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl hover:bg-amber-600 hover:text-white transition-all">
                                                            <X size={20} />
                                                        </button>
                                                    </>
                                                )}
                                                <button onClick={() => deleteRegistration(reg._id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all">
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    )}
                    {/* --- GALLERY TAB --- */}
                    {activeTab === 'gallery' && (
                        <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 glass-morphism p-8 rounded-[2.5rem] border border-white/5 h-fit sticky top-40">
                                <h2 className="text-xl font-bold italic mb-6 text-violet-500">Add Media</h2>
                                <div className="flex gap-4 mb-6 p-1 bg-white/5 rounded-xl border border-white/5">
                                    <button onClick={() => setGalleryForm({ ...galleryForm, type: 'photo' })} className={`flex-1 py-2 text-[9px] font-black rounded-lg transition-all ${galleryForm.type === 'photo' ? 'bg-violet-600 text-white' : 'text-gray-500'}`}>PHOTO</button>
                                    <button onClick={() => setGalleryForm({ ...galleryForm, type: 'video' })} className={`flex-1 py-2 text-[9px] font-black rounded-lg transition-all ${galleryForm.type === 'video' ? 'bg-violet-600 text-white' : 'text-gray-500'}`}>VIDEO</button>
                                </div>
                                <form onSubmit={handleGallerySubmit} className="space-y-4">
                                    <input type="number" className="admin-input" placeholder="Year" value={galleryForm.year} onChange={e => setGalleryForm({ ...galleryForm, year: e.target.value })} required />
                                    {galleryForm.type === 'photo' ? (
                                        <input type="file" className="admin-input pt-3" onChange={e => setSelectedFile(e.target.files[0])} required />
                                    ) : (
                                        <input className="admin-input" placeholder="YouTube URL" value={galleryForm.youtubeUrl} onChange={e => setGalleryForm({ ...galleryForm, youtubeUrl: e.target.value })} required />
                                    )}
                                    <input className="admin-input" placeholder="Caption" value={galleryForm.caption} onChange={e => setGalleryForm({ ...galleryForm, caption: e.target.value })} />
                                    <button disabled={loading} className="admin-btn-primary w-full">{loading ? "Processing..." : "Commit to Archives"}</button>
                                </form>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4 h-fit">
                                {galleryItems.map((item) => (
                                    <div key={item._id} className="relative aspect-square glass-morphism rounded-2xl overflow-hidden group border border-white/5">
                                        {item.type === 'photo' ? <img src={item.url} className="w-full h-full object-cover opacity-60" alt="" /> : <div className="w-full h-full flex items-center justify-center bg-violet-900/20"><Video className="text-violet-500" /></div>}
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[8px] font-bold text-violet-400">{item.year}</div>
                                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => deleteGalleryItem(item._id)} className="p-3 bg-red-600/20 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- UPDATES TICKER TAB --- */}
                    {activeTab === 'updates' && (
                        <motion.div key="updates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 glass-morphism p-8 rounded-[2.5rem] border border-white/5 h-fit sticky top-40">
                                <h2 className="text-xl font-bold italic mb-6 text-violet-500">Live Ticker</h2>
                                <p className="text-xs text-gray-500 mb-4">These updates will scroll horizontally at the top of the home page.</p>
                                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                    <textarea
                                        className="admin-input h-32"
                                        placeholder="Type update message..."
                                        value={updateText}
                                        onChange={e => setUpdateText(e.target.value)}
                                        required
                                    />
                                    <button disabled={loading} className="admin-btn-primary w-full">
                                        {loading ? "Adding..." : "Add Live Update"}
                                    </button>
                                </form>
                            </div>
                            <div className="lg:col-span-2 space-y-3">
                                <h3 className="text-xs font-black tracking-widest uppercase text-gray-500 mb-4">Active Updates</h3>
                                {updates.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group">
                                        <div className="flex items-center gap-4">
                                            <Megaphone size={16} className="text-violet-500" />
                                            <span className="text-sm text-gray-200 font-mono">{item.text}</span>
                                        </div>
                                        <button
                                            onClick={() => deleteUpdate(item._id)}
                                            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                            title="Remove Update"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {updates.length === 0 && <p className="text-gray-600 italic text-sm">No live updates running.</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* --- STALLS TAB --- */}
                    {activeTab === 'stalls' && (
                        <motion.div key="stalls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xs font-black tracking-widest uppercase text-gray-500">
                                    Applicant Queue ({stalls.length})
                                </h2>
                                <button onClick={downloadStallExcel} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl">
                                    <Download size={14} /> Export to Excel
                                </button>
                            </div>

                            {stalls.length === 0 ? (
                                <p className="text-center text-gray-600 py-20 italic">No applications found.</p>
                            ) : (
                                <div className="grid gap-4">
                                    {stalls.map(s => (
                                        <motion.div layout key={s._id} className="p-8 glass-morphism rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-violet-500/30 transition-all">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase shadow-sm ${s.status === 'Approved' ? 'bg-green-500/20 text-green-500' : s.status === 'Rejected' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
                                                        {s.status}
                                                    </span>
                                                    <h4 className="text-xl font-bold text-white">{s.applicantName}</h4>
                                                </div>
                                                <p className="text-gray-400 text-sm font-medium">{s.stallType} • {s.phone}</p>
                                                <p className="text-gray-500 text-[11px] mt-1 italic leading-relaxed max-w-xl">"{s.description}"</p>
                                                <div className="mt-4 flex gap-4 text-[10px] font-bold text-gray-500 tracking-widest">
                                                    <span>{s.email}</span>
                                                    <span className="text-violet-400">{s.phone}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                {s.status !== 'Approved' && (
                                                    <button onClick={() => updateStallStatus(s._id, 'Approved')} className="p-4 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-lg group/btn" title="Approve Stall">
                                                        <Check size={20} className="group-hover/btn:scale-110 transition" />
                                                    </button>
                                                )}
                                                {s.status === 'Pending' && (
                                                    <button onClick={() => updateStallStatus(s._id, 'Rejected')} className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl hover:bg-amber-600 hover:text-white transition-all shadow-lg group/btn" title="Reject Application">
                                                        <X size={20} className="group-hover/btn:scale-110 transition" />
                                                    </button>
                                                )}
                                                <button onClick={() => deleteStall(s._id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-lg group/btn" title="Delete Permanently">
                                                    <Trash2 size={20} className="group-hover/btn:scale-110 transition" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}


                    {activeTab === 'tshirts' && (
                        <motion.div key="tshirts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xs font-black tracking-widest uppercase text-gray-500">
                                    Total Orders ({tshirts.length})
                                </h2>
                                <button onClick={downloadTShirtExcel} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl">
                                    <Download size={14} /> Export List
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/10">
                                            <th className="p-4">Student</th>
                                            <th className="p-4">Size</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {tshirts.map(item => (
                                            <tr key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-bold text-white">{item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.usn} • {item.department}</div>
                                                    <div className="text-xs text-violet-400">{item.phone}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">{item.size}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
                                                        'bg-amber-500/20 text-amber-500'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right flex justify-end gap-2">
                                                    {/* Mark Delivered Button */}
                                                    {item.status !== 'Delivered' && (
                                                        <button
                                                            onClick={() => updateTShirtStatus(item._id, 'Delivered')}
                                                            className="p-2 bg-blue-500/10 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors"
                                                            title="Mark as Delivered"
                                                        >
                                                            <Shirt size={16} />
                                                        </button>
                                                    )}

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => deleteTShirt(item._id)}
                                                        className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {tshirts.length === 0 && <p className="text-center text-gray-500 py-10">No orders received yet.</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* --- ALUMNI REGISTRATIONS TAB --- */}
                    {activeTab === 'alumni' && (
                        <motion.div key="alumni" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xs font-black tracking-widest uppercase text-gray-500">
                                    Alumni Registrations ({alumniRegistrations.length})
                                </h2>
                                <button onClick={downloadAlumniExcel} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl">
                                    <Download size={14} /> Export List
                                </button>
                            </div>

                            {alumniRegistrations.length === 0 ? (
                                <p className="text-center text-gray-600 py-20 italic">No alumni registrations found.</p>
                            ) : (
                                <div className="grid gap-4">
                                    {alumniRegistrations.map(alumni => (
                                        <motion.div layout key={alumni._id} className="p-8 glass-morphism rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-violet-500/30 transition-all">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase shadow-sm ${alumni.attendFest === 'yes' ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                                        {alumni.attendFest === 'yes' ? 'Attending' : 'Not Attending'}
                                                    </span>
                                                    <h4 className="text-xl font-bold text-white">{alumni.fullName}</h4>
                                                </div>
                                                <p className="text-gray-400 text-sm font-medium">
                                                    {alumni.branch} ({alumni.passingYear}) • {alumni.currentOccupation || 'N/A'}
                                                </p>
                                                <p className="text-gray-500 text-[11px] mt-1">
                                                    <span className="text-violet-400">{alumni.email}</span> • {alumni.phoneNumber}
                                                </p>

                                                {alumni.conductEvent === 'yes' && (
                                                    <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <PlusCircle size={16} className="text-violet-500" />
                                                            <h5 className="text-sm font-bold text-white">Event Idea:</h5>
                                                            <span className={`ml-auto px-2 py-0.5 rounded text-[8px] font-black uppercase shadow-sm ${getEventIdeaStatusClass(alumni.eventIdeaStatus)}`}>
                                                                {alumni.eventIdeaStatus}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm leading-relaxed italic">{alumni.eventIdea || 'No description provided.'}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                {alumni.conductEvent === 'yes' && alumni.eventIdeaStatus !== 'Approved' && (
                                                    <button onClick={() => updateAlumniEventIdeaStatus(alumni._id, 'Approved')} className="p-4 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-lg group/btn" title="Approve Event Idea">
                                                        <Check size={20} className="group-hover/btn:scale-110 transition" />
                                                    </button>
                                                )}
                                                {alumni.conductEvent === 'yes' && alumni.eventIdeaStatus === 'Pending' && (
                                                    <button onClick={() => updateAlumniEventIdeaStatus(alumni._id, 'Rejected')} className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl hover:bg-amber-600 hover:text-white transition-all shadow-lg group/btn" title="Reject Event Idea">
                                                        <X size={20} className="group-hover/btn:scale-110 transition" />
                                                    </button>
                                                )}
                                                <button onClick={() => deleteAlumniRegistration(alumni._id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-lg group/btn" title="Delete Registration">
                                                    <Trash2 size={20} className="group-hover/btn:scale-110 transition" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}


                </AnimatePresence>


            </div>




            <style jsx="true">{`
                .admin-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 1.25rem;
                    padding: 1rem;
                    outline: none;
                    font-size: 0.875rem;
                    color: white;
                    transition: border-color 0.3s;
                }
                .admin-input:focus { border-color: #7c3aed; }
                .admin-btn-primary {
                    background: #7c3aed;
                    color: white;
                    padding: 1rem;
                    border-radius: 1.25rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.75rem;
                    transition: all 0.3s;
                    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.2);
                }
                .admin-btn-primary:hover {
                    background: #6d28d9;
                    transform: translateY(-2px);
                }
                .admin-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
            `}</style>
        </div>
    );
}