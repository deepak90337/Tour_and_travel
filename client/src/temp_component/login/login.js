import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';


const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('Login successful');
        navigate('/'); // Redirect to home page on success
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
