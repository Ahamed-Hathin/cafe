import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Coffee, MessageSquare, LogOut, RefreshCw, 
  Plus, Edit, Trash2, LayoutDashboard, IndianRupee, 
  AlertCircle, CheckCircle, Clock, User, ChevronRight, TrendingUp
} from 'lucide-react';
import { Form, Button, Dropdown, Table, Badge, Spinner } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { requestNotificationPermission, onMessageListener } from '../config/firebase';

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    topItem: 'None'
  });

  const [salesData, setSalesData] = useState([]);
  const [salesRange, setSalesRange] = useState('7days');

  // Menu Form State (for side-by-side editing)
  const [editingItem, setEditingItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    availability: true
  });

  useEffect(() => {
    fetchData();
    setupNotifications();
  }, [activeTab, salesRange]);

  const setupNotifications = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        await api.post('/auth/fcm-token', { fcmToken: token });
      }
      onMessageListener((payload) => {
        toast.success(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
        if (activeTab === 'orders' || activeTab === 'dashboard') fetchData();
      });
    } catch (err) {
      console.error('Notification setup failed', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const statsRes = await api.get('/admin/dashboard');
        const salesRes = await api.get(`/admin/sales?range=${salesRange}`);
        if (statsRes.data.success) setDashboardStats(statsRes.data.data);
        if (salesRes.data.success) setSalesData(salesRes.data.data);
      } else if (activeTab === 'orders') {
        const { data } = await api.get('/orders');
        setOrders(data.data || []);
      } else if (activeTab === 'messages') {
        const { data } = await api.get('/contact');
        setMessages(data.data || []);
      } else if (activeTab === 'menu') {
        const { data } = await api.get('/menu');
        setMenuItems(data.data || []);
      }
    } catch (err) {
      toast.error('Failed to sync data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Orders Management
  const updateStatus = async (id, status) => {
    setIsSubmitting(true);
    try {
      await api.put(`/orders/${id}`, { status });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Menu Management
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await api.put(`/menu/${editingItem._id}`, menuForm);
        toast.success('Item updated successfully');
      } else {
        await api.post('/menu', menuForm);
        toast.success('New item added');
      }
      resetMenuForm();
      fetchData();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    setIsSubmitting(true);
    try {
      await api.delete(`/menu/${id}`);
      setMenuItems(menuItems.filter(m => m._id !== id));
      toast.success('Item removed');
    } catch {
      toast.error('Failed to delete item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditItem = (item) => {
    setEditingItem(item);
    setMenuForm({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      availability: item.availability
    });
  };

  const resetMenuForm = () => {
    setEditingItem(null);
    setMenuForm({
      name: '',
      price: '',
      category: '',
      image: '',
      availability: true
    });
  };

  const statusMap = {
    'Pending': { bg: 'warning', text: 'dark' },
    'Preparing': { bg: 'primary', text: 'white' },
    'Ready': { bg: 'success', text: 'white' },
  };

  const isRecentOrder = (createdAt) => {
    const diff = (new Date() - new Date(createdAt)) / 1000 / 60;
    return diff < 5;
  };

  return (
    <div className="admin-container d-flex">
      {/* Sidebar */}
      <aside className="sidebar text-white d-flex flex-column" style={{ backgroundColor: '#1F1F1F', width: '260px', minHeight: '100vh', position: 'fixed' }}>
        <div className="sidebar-header p-4 border-bottom border-secondary">
          <h4 className="m-0 fw-bold" style={{ color: '#D3543F' }}>Freddo Bistro</h4>
          <small className="text-secondary opacity-75">Control Center</small>
        </div>
        
        <nav className="p-3 flex-grow-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'menu', label: 'Menu', icon: Coffee },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link-btn d-flex align-items-center gap-3 w-100 p-3 mb-2 rounded-3 text-start border-0 transition ${
                activeTab === item.id ? 'active-tab' : 'inactive-tab'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <Button variant="outline-danger" className="w-100 border-0 d-flex align-items-center justify-content-center gap-2" onClick={logout}>
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-grow-1" style={{ marginLeft: '260px', backgroundColor: '#F5F3EF', minHeight: '100vh' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
          <div className="container-fluid p-0">
            <span className="navbar-brand m-0 fw-bold text-dark text-capitalize">{activeTab} Page</span>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 text-dark me-3">
                <div className="bg-light p-2 rounded-circle">
                  <User size={18} className="text-secondary" />
                </div>
                <span className="fw-medium small">{admin?.username || 'Admin'}</span>
              </div>
              <Button variant="light border" className="rounded-circle p-2 shadow-sm" onClick={fetchData} disabled={loading}>
                <RefreshCw size={18} className={loading ? 'spin' : ''} />
              </Button>
            </div>
          </div>
        </nav>

        <div className="p-4 container-fluid">
          {loading && !isSubmitting && (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
              <Spinner animation="border" style={{ color: '#D3543F' }} className="mb-3" />
              <p className="text-secondary fw-medium">Syncing Data...</p>
            </div>
          )}

          {!loading && (
            <>
              {activeTab === 'dashboard' && (
                <div className="fade-in">
                  <div className="row g-4 mb-5">
                    {[
                      { label: 'Total Orders', value: dashboardStats.totalOrders, icon: ShoppingBag, color: 'text-dark' },
                      { label: 'Today Revenue', value: `₹${dashboardStats.totalRevenue}`, icon: IndianRupee, color: 'text-success' },
                      { label: 'Pending Orders', value: dashboardStats.pendingOrders, icon: Clock, color: 'text-warning' },
                      { label: 'Completed Orders', value: dashboardStats.completedOrders, icon: CheckCircle, color: 'text-success' },
                    ].map((card, idx) => (
                      <div className="col-md-6 col-lg-3" key={idx}>
                        <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                          <div className={`mb-3 mx-auto d-inline-flex bg-light p-3 rounded-circle ${card.color}`}>
                            <card.icon size={24} />
                          </div>
                          <h6 className="text-secondary text-uppercase fw-bold small mb-2">{card.label}</h6>
                          <h2 className={`m-0 fw-bold ${card.color}`}>{card.value}</h2>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="m-0 fw-bold text-dark d-flex align-items-center gap-2">
                        <TrendingUp size={20} className="text-success" /> Sales Analytics
                      </h5>
                      <div className="btn-group btn-group-sm rounded-pill p-1 bg-light">
                        <Button variant={salesRange === '7days' ? 'white shadow-sm rounded-pill' : 'transparent'} size="sm" onClick={() => setSalesRange('7days')}>7D</Button>
                        <Button variant={salesRange === '30days' ? 'white shadow-sm rounded-pill' : 'transparent'} size="sm" onClick={() => setSalesRange('30days')}>30D</Button>
                      </div>
                    </div>
                    <div style={{ height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D3543F" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#D3543F" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                          <XAxis dataKey="date" tick={{fontSize: 10}} tickFormatter={(v) => v.slice(5)} />
                          <YAxis tick={{fontSize: 10}} hide />
                          <Tooltip contentStyle={{border: '0', borderRadius: '12px', boxShadow: '0 5px 25px rgba(0,0,0,0.1)'}} />
                          <Area type="monotone" dataKey="totalRevenue" stroke="#D3543F" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="fade-in card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
                  <div className="table-responsive">
                    <Table hover className="m-0 align-middle">
                      <thead className="bg-light border-bottom">
                        <tr className="small text-secondary text-uppercase fw-bold">
                          <th className="px-4 py-3">Customer</th>
                          <th className="px-4 py-3">Items Order</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o._id} className={isRecentOrder(o.createdAt) ? 'highlight-row' : ''}>
                            <td className="px-4 py-4">
                              <div className="fw-bold text-dark">{o.customerName}</div>
                              <small className="text-secondary">{o.phone}</small>
                            </td>
                            <td className="px-4 py-4">
                              <div className="d-flex flex-wrap gap-1">
                                {o.items.map((it, idx) => (
                                  <span key={idx} className="badge bg-light text-dark fw-normal border rounded-pill px-2">
                                    {it.name} <span className="fw-bold text-primary">x{it.quantity}</span>
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-4 fw-bold">₹{o.totalPrice}</td>
                            <td className="px-4 py-4">
                              <Badge bg={statusMap[o.status]?.bg || 'secondary'} className={`py-2 px-3 rounded-pill fw-bold`}>
                                {o.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-end">
                              <Dropdown align="end">
                                <Dropdown.Toggle variant="light" className="border-0 shadow-none p-2 rounded-circle">
                                  <Edit size={16} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="shadow-lg border-0 rounded-4 p-2">
                                  <Dropdown.Item onClick={() => updateStatus(o._id, 'Pending')} className="rounded-3 py-2">Set Pending</Dropdown.Item>
                                  <Dropdown.Item onClick={() => updateStatus(o._id, 'Preparing')} className="rounded-3 py-2 text-primary">Set Preparing</Dropdown.Item>
                                  <Dropdown.Item onClick={() => updateStatus(o._id, 'Ready')} className="rounded-3 py-2 text-success">Mark Ready</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}

              {activeTab === 'menu' && (
                <div className="row g-4 fade-in">
                  <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
                      <h5 className="fw-bold mb-4 text-dark">{editingItem ? 'Edit Menu Item' : 'Create New Item'}</h5>
                      <Form onSubmit={handleMenuSubmit}>
                        <Form.Group className="mb-3">
                          <label className="text-secondary small fw-bold mb-1">NAME</label>
                          <Form.Control 
                            type="text" 
                            required 
                            value={menuForm.name} 
                            onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
                            className="p-2 bg-light border-0 rounded-3 text-dark"
                          />
                        </Form.Group>
                        <div className="row g-3 mb-3">
                          <div className="col-6">
                            <label className="text-secondary small fw-bold mb-1">PRICE (₹)</label>
                            <Form.Control 
                              type="number" 
                              required 
                              value={menuForm.price} 
                              onChange={(e) => setMenuForm({...menuForm, price: e.target.value})}
                              className="p-2 bg-light border-0 rounded-3 text-dark"
                            />
                          </div>
                          <div className="col-6">
                            <label className="text-secondary small fw-bold mb-1">CATEGORY</label>
                            <Form.Select 
                              required 
                              value={menuForm.category} 
                              onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                              className="p-2 bg-light border-0 rounded-3 text-dark"
                            >
                              <option value="">Select</option>
                              <option value="Hot Coffee">Hot Coffee</option>
                              <option value="Cold Coffee">Cold Coffee</option>
                              <option value="Snacks">Snacks</option>
                              <option value="Desserts">Desserts</option>
                            </Form.Select>
                          </div>
                        </div>
                        <Form.Group className="mb-4">
                          <label className="text-secondary small fw-bold mb-1">IMAGE URL</label>
                          <Form.Control 
                            type="text" 
                            value={menuForm.image} 
                            onChange={(e) => setMenuForm({...menuForm, image: e.target.value})}
                            className="p-2 bg-light border-0 rounded-3 text-dark"
                          />
                        </Form.Group>
                        <div className="d-flex gap-2">
                          <Button 
                            type="submit" 
                            className="flex-grow-1 py-2 fw-bold border-0 shadow-sm" 
                            style={{ backgroundColor: '#D3543F' }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Saving...' : editingItem ? 'Update Item' : 'Creating Item'}
                          </Button>
                          {editingItem && (
                            <Button variant="light border" onClick={resetMenuForm}>Cancel</Button>
                          )}
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
                      <Table hover className="m-0 align-middle">
                        <thead className="bg-light border-bottom">
                          <tr className="small text-secondary text-uppercase fw-bold">
                            <th className="px-4 py-3">Item Info</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3 text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menuItems.map((item) => (
                            <tr key={item._id}>
                              <td className="px-4 py-3">
                                <div className="d-flex align-items-center gap-3">
                                  <img src={item.image || '/menu_flatlay.png'} className="rounded shadow-sm" style={{width: '40px', height: '40px', objectFit: 'cover'}} alt="" />
                                  <div>
                                    <div className="fw-bold">{item.name}</div>
                                    <small className={item.availability ? 'text-success' : 'text-danger'}>
                                      {item.availability ? 'Available' : 'Sold Out'}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 small text-secondary">{item.category}</td>
                              <td className="px-4 py-3 fw-bold text-dark">₹{item.price}</td>
                              <td className="px-4 py-3 text-end">
                                <div className="d-flex gap-2 justify-content-end">
                                  <button onClick={() => startEditItem(item)} className="btn btn-sm btn-light p-2 rounded-circle border shadow-sm"><Edit size={14} /></button>
                                  <button onClick={() => deleteMenuItem(item._id)} className="btn btn-sm btn-light p-2 rounded-circle border shadow-sm text-danger"><Trash2 size={14} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="fade-in card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
                  <div className="table-responsive">
                    <Table hover className="m-0 align-middle">
                      <thead className="bg-light border-bottom">
                        <tr className="small text-secondary text-uppercase fw-bold">
                          <th className="px-4 py-3" style={{ width: '20%' }}>Sender</th>
                          <th className="px-4 py-3" style={{ width: '15%' }}>Phone</th>
                          <th className="px-4 py-3">Message Body</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((m) => (
                          <tr key={m._id}>
                            <td className="px-4 py-4 fw-bold">{m.name || 'Guest'}</td>
                            <td className="px-4 py-4 text-secondary small">{m.phone}</td>
                            <td className="px-4 py-4 text-dark-50">{m.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <style>{`
        body { color: #3A3A3A; overflow-x: hidden; }
        .text-primary { color: #D3543F !important; }
        .btn-primary { background-color: #D3543F; border-color: #D3543F; }
        .btn-primary:hover { background-color: #BA4735; border-color: #BA4735; }
        
        .sidebar { z-index: 1000; box-shadow: 10px 0 30px rgba(0,0,0,0.1); }
        .nav-link-btn { transition: all 0.2s ease; }
        .active-tab { background-color: rgba(211, 84, 63, 0.15); color: #D3543F !important; }
        .inactive-tab { color: #8A8A8A; background: transparent; }
        .inactive-tab:hover { background-color: rgba(255,255,255,0.05); color: #FFF; }
        
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .highlight-row { background-color: rgba(211, 84, 63, 0.05) !important; position: relative; }
        .highlight-row::after { content: 'NEW'; position: absolute; left: 0; top: 0; background: #D3543F; color: white; font-size: 8px; padding: 2px 5px; font-weight: bold; border-bottom-right-radius: 4px; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        th { font-weight: 700; background-color: #FAFAFA !important; }
        .table-responsive { min-height: 400px; }
      `}</style>
    </div>
  );
}
