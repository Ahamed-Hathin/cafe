import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function OrderModal({ show, onHide, item }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    quantity: 1
  });

  if (!item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        customerName: form.customerName,
        phone: form.phone,
        items: [
          {
            name: item.name,
            price: item.price,
            quantity: Number(form.quantity)
          }
        ],
        totalPrice: item.price * Number(form.quantity)
      };

      await api.post('/orders', payload);
      toast.success('Order placed successfully! ☕');
      setForm({ customerName: '', phone: '', quantity: 1 });
      onHide();
    } catch (err) {
        console.error(err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 px-5 pt-5 pb-0">
        <Modal.Title className="fw-bold display-6">Order Now</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 pb-5 pt-4">
        <div className="d-flex align-items-center gap-4 mb-5 p-4 bg-light-cream rounded-4 border-0 shadow-sm transition-all">
            <img src={item.image || '/menu_flatlay.png'} alt={item.name} className="rounded-circle shadow-sm" style={{width: '70px', height: '70px', objectFit: 'cover'}} />
            <div>
                <h5 className="fw-bold mb-1 text-uppercase tracking-wide text-dark">{item.name}</h5>
                <p className="text-primary fw-bold fs-5 mb-0">₹{item.price}</p>
            </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fs-small fw-bold text-uppercase tracking-wider text-secondary">Your Name</Form.Label>
            <Form.Control 
              type="text" 
              required
              placeholder="Ex: John Doe"
              value={form.customerName}
              onChange={(e) => setForm({...form, customerName: e.target.value})}
              className="rounded-pill shadow-none border-light-subtle px-4 py-2"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-small fw-bold text-uppercase tracking-wider text-secondary">Phone Number</Form.Label>
            <Form.Control 
              type="tel" 
              required
              placeholder="Ex: 9876543210"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="rounded-pill shadow-none border-light-subtle px-4 py-2"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fs-small fw-bold text-uppercase tracking-wider text-secondary">Quantity</Form.Label>
            <Form.Control 
              type="number" 
              min="1"
              required
              value={form.quantity}
              onChange={(e) => setForm({...form, quantity: e.target.value})}
              className="rounded-pill shadow-none border-light-subtle px-4 py-2"
            />
          </Form.Group>

          <Button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary btn-lg w-100 rounded-pill py-3 text-uppercase fw-bold shadow-lg"
          >
            {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
            ) : `Confirm Order - ₹${item.price * Number(form.quantity)}`}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
