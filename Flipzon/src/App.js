import React, { useState, useEffect } from 'react';
import {
	Container, Row, Col, Card, Form, Button,
	Navbar, Offcanvas, InputGroup, Badge, Nav
} from 'react-bootstrap';
import {
	Mail, Lock, User, Phone, MapPin, Globe,
	Menu, LogOut, ShoppingCart, Smartphone, Send
} from 'lucide-react';

// --- MOCK DATA ---
const mockProducts = [
	{ id: 1, name: "Galaxy S24 Ultra", price: "$1199", img: "📱" },
	{ id: 2, name: "iPhone 15 Pro", price: "$1099", img: "📱" },
	{ id: 3, name: "Pixel 8 Pro", price: "$999", img: "📱" },
	{ id: 4, name: "OnePlus 12", price: "$799", img: "📱" },
	{ id: 5, name: "Nothing Phone 2", price: "$699", img: "📱" },
	{ id: 6, name: "Xiaomi 14", price: "$899", img: "📱" },
	{ id: 7, name: "Sony Xperia 1 V", price: "$1299", img: "📱" },
	{ id: 8, name: "Motorola Edge+", price: "$799", img: "📱" }
];

export default function App() {

	const [currentView, setCurrentView] = useState('login');
	const [showSidebar, setShowSidebar] = useState(false);

	// Local State
	const [registeredUsers, setRegisteredUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [authError, setAuthError] = useState('');

	// 1. Load users and active session from localStorage on mount
	useEffect(() => {
		try {
			const savedUsers = localStorage.getItem('flipzon_users');
			if (savedUsers) {
				setRegisteredUsers(JSON.parse(savedUsers));
			}

			const activeUser = localStorage.getItem('flipzon_active_user');
			if (activeUser) {
				setCurrentUser(JSON.parse(activeUser));
				setCurrentView('home');
			}
		} catch (error) {
			console.warn("localStorage restricted in this environment.");
		}
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		setAuthError('');

		const email = e.target.email.value;
		const password = e.target.password.value;

		const user = registeredUsers.find(u => u.email === email);

		if (!user) {
			setAuthError('Account not found. Please create one.');
			return;
		}
		if (user.password !== password) {
			setAuthError('Incorrect password. Please try again.');
			return;
		}

		setCurrentUser(user);
		setCurrentView('home');
		try {
			localStorage.setItem('flipzon_active_user', JSON.stringify(user));
		} catch (e) { }
	};

	const handleRegister = (e) => {
		e.preventDefault();
		setAuthError('');

		const formData = new FormData(e.target);
		const userData = Object.fromEntries(formData.entries());

		if (registeredUsers.some(u => u.email === userData.email)) {
			setAuthError('An account with this email already exists.');
			return;
		}

		const updatedUsers = [...registeredUsers, userData];
		setRegisteredUsers(updatedUsers);
		setCurrentUser(userData);
		setCurrentView('home');

		try {
			localStorage.setItem('flipzon_users', JSON.stringify(updatedUsers));
			localStorage.setItem('flipzon_active_user', JSON.stringify(userData));
		} catch (error) { }
	};

	const handleLogout = () => {
		setShowSidebar(false);
		setCurrentUser(null);
		setCurrentView('login');
		try {
			localStorage.removeItem('flipzon_active_user');
		} catch (e) { }
	};

	// --- VIEWS ---
	const LoginView = () => (
		<Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
			<Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '450px', borderRadius: '1rem' }}>
				<Card.Body className="p-5">
					<div className="text-center mb-4">
						<h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
						<p className="text-muted">Sign in to continue to Flipzon</p>
					</div>

					{authError && <div className="alert alert-danger py-2">{authError}</div>}

					<Form onSubmit={handleLogin}>
						<InputGroup className="mb-3">
							<InputGroup.Text className="bg-white"><Mail size={18} className="text-muted" /></InputGroup.Text>
							<Form.Control type="email" name="email" placeholder="Email Address" required className="py-2" />
						</InputGroup>

						<InputGroup className="mb-4">
							<InputGroup.Text className="bg-white"><Lock size={18} className="text-muted" /></InputGroup.Text>
							<Form.Control type="password" name="password" placeholder="Password" required className="py-2" />
						</InputGroup>

						<div className="d-flex justify-content-end mb-4">
							<a href="#" className="text-decoration-none small text-primary fw-semibold">Forgot password?</a>
						</div>

						<Button variant="primary" type="submit" className="w-100 py-2 fw-bold d-flex justify-content-center align-items-center gap-2 rounded-pill">
							Sign In <Lock size={16} />
						</Button>
					</Form>

					<p className="mt-4 text-center text-muted mb-0">
						Don't have an account?{' '}
						<Button variant="link" className="p-0 fw-semibold text-decoration-none align-baseline" onClick={() => { setAuthError(''); setCurrentView('register'); }}>
							Create one
						</Button>
					</p>
				</Card.Body>
			</Card>
		</Container>
	);

	const RegisterView = () => (
		<Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
			<Card className="shadow-lg border-0" style={{ width: '100%', maxWidth: '800px', borderRadius: '1rem' }}>
				<Card.Body className="p-4 p-md-5">
					<div className="text-center mb-4">
						<h2 className="fw-bold text-primary mb-2">Create an Account</h2>
						<p className="text-muted">Join Flipzon for the best electronic deals</p>
					</div>

					{authError && <div className="alert alert-danger py-2">{authError}</div>}

					<Form onSubmit={handleRegister}>
						<Row>
							<Col md={6}>
								<InputGroup className="mb-3">
									<InputGroup.Text className="bg-white"><User size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="text" name="fullName" placeholder="Full Name" required />
								</InputGroup>
							</Col>
							<Col md={6}>
								<InputGroup className="mb-3">
									<InputGroup.Text className="bg-white"><Phone size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="tel" name="phone" placeholder="Phone Number" required />
								</InputGroup>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<InputGroup className="mb-3">
									<InputGroup.Text className="bg-white"><Mail size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="email" name="email" placeholder="Email Address" required />
								</InputGroup>
							</Col>
							<Col md={6}>
								<InputGroup className="mb-3">
									<InputGroup.Text className="bg-white"><Lock size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="password" name="password" placeholder="Create Password" required />
								</InputGroup>
							</Col>
						</Row>

						<InputGroup className="mb-3">
							<InputGroup.Text className="bg-white align-items-start pt-2"><MapPin size={18} className="text-muted" /></InputGroup.Text>
							<Form.Control as="textarea" name="deliveryAddress" placeholder="Delivery Address" required rows={2} />
						</InputGroup>

						<InputGroup className="mb-3">
							<InputGroup.Text className="bg-white align-items-start pt-2"><MapPin size={18} className="text-muted" /></InputGroup.Text>
							<Form.Control as="textarea" name="permanentAddress" placeholder="Permanent Address" required rows={2} />
						</InputGroup>

						<Row>
							<Col md={6}>
								<InputGroup className="mb-4">
									<InputGroup.Text className="bg-white"><Globe size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="text" name="country" placeholder="Country" required />
								</InputGroup>
							</Col>
							<Col md={6}>
								<InputGroup className="mb-4">
									<InputGroup.Text className="bg-white"><MapPin size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="text" name="state" placeholder="State" required />
								</InputGroup>
							</Col>
						</Row>

						<Button variant="primary" type="submit" className="w-100 py-2 fw-bold rounded-pill mt-2">
							Register & Continue
						</Button>
					</Form>

					<p className="mt-4 text-center text-muted mb-0">
						Already have an account?{' '}
						<Button variant="link" className="p-0 fw-semibold text-decoration-none align-baseline" onClick={() => { setAuthError(''); setCurrentView('login'); }}>
							Log in
						</Button>
					</p>
				</Card.Body>
			</Card>
		</Container>
	);

	const HomeView = () => (
		<div className="bg-light min-vh-100 d-flex flex-column">

			{/* <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm sticky-top py-3"> */}
			{/* 	<Container> */}
			{/* 		<Navbar.Brand href="#" className="d-flex align-items-center gap-2 fw-bold fs-4"> */}
			{/* 			<Smartphone size={28} /> Flipzon */}
			{/* 		</Navbar.Brand> */}
			{/* 		<Button */}
			{/* 			variant="outline-light" */}
			{/* onClick={() => setShowSidebar(true)} */}
			{/* 			className="d-flex align-items-center gap-2 border-2 rounded-pill px-3" */}
			{/* 		> */}
			{/* 			<Menu size={20} /> <span className="d-none d-sm-inline fw-semibold">Menu</span> */}
			{/* 		</Button> */}
			{/* 	</Container> */}
			{/* </Navbar> */}


			<Navbar bg="primary" variant='dark' className='py-3'>
				<Container>

					<Navbar.Brand>
						<Smartphone size={28} /> Flipzon
					</Navbar.Brand>


					<Nav className='d-flex align-items-center gap-2'>
						<Nav.Link href="/home" className="text-white fw-semibold">
							Home
						</Nav.Link>

						<Button className='d-flex align-items-center gap-2' variant="outline-light" onClick={() => setShowSidebar(true)} >
							<Menu size={20} /> Menu
						</Button>

					</Nav>

				</Container>
			</Navbar>

			{/* MAIN CONTENT */}
			<Container className="py-5">

				{/* PRODUCTS SECTION */}
				<div className="mb-5">
					<div className="mb-4">
						<h2 className="fw-bold mb-1">Featured Devices</h2>
						<p className="text-muted">Discover our latest collection</p>
					</div>

					<Row xs={1} sm={2} lg={4} className="g-4">
						{mockProducts.map((product) => (
							<Col key={product.id}>
								<Card className="h-100 border-0 shadow-sm custom-card-hover overflow-hidden" style={{ borderRadius: '1rem' }}>
									<div className="bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center py-5 transition-all">
										<div className="display-1">{product.img}</div>
									</div>
									<Card.Body className="p-4 d-flex flex-column">
										<Card.Title className="fw-bold fs-5 mb-3">{product.name}</Card.Title>
										<div className="mt-auto d-flex justify-content-between align-items-center">
											<h4 className="text-primary fw-bold mb-0">{product.price}</h4>
											<Button variant="light" className="text-primary rounded-circle p-2 shadow-sm">
												<ShoppingCart size={20} />
											</Button>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>

				{/* CONTACT SECTION */}
				<Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '1rem' }}>
					<Row className="g-0">
						<Col lg={4} className="bg-primary text-white p-4 p-lg-5 d-flex flex-column justify-content-center">
							<h3 className="fw-bold mb-3">Get in Touch</h3>
							<p className="opacity-75 mb-4">Have questions about a product? Our team is here to help you make the right choice.</p>
							<div className="d-flex flex-column gap-3">
								<div className="d-flex align-items-center gap-3">
									<Mail className="opacity-75" /> <span>support@flipzon.com</span>
								</div>
								<div className="d-flex align-items-center gap-3">
									<Phone className="opacity-75" /> <span>+1 (555) 123-4567</span>
								</div>
							</div>
						</Col>

						<Col lg={8} className="p-4 p-lg-5">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Row>
									<Col md={6}>
										<InputGroup className="mb-3">
											<InputGroup.Text className="bg-white"><User size={18} className="text-muted" /></InputGroup.Text>
											<Form.Control type="text" placeholder="Your Name" />
										</InputGroup>
									</Col>
									<Col md={6}>
										<InputGroup className="mb-3">
											<InputGroup.Text className="bg-white"><Mail size={18} className="text-muted" /></InputGroup.Text>
											<Form.Control type="email" placeholder="Your Email" />
										</InputGroup>
									</Col>
								</Row>

								<InputGroup className="mb-3">
									<InputGroup.Text className="bg-white"><Smartphone size={18} className="text-muted" /></InputGroup.Text>
									<Form.Control type="text" placeholder="Subject" />
								</InputGroup>

								<Form.Control as="textarea" placeholder="How can we help you?" required rows={4} className="mb-4" />

								<div className="d-flex justify-content-end">
									<Button variant="primary" type="submit" className="px-4 py-2 fw-bold d-flex align-items-center gap-2 rounded-pill">
										Send Message <Send size={16} />
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Card>
			</Container>

			{/* SIDEBAR OFFCANVAS */}
			<Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end" className="border-0 shadow-lg">
				<Offcanvas.Header closeButton className="bg-light border-bottom p-4">
					<Offcanvas.Title className="fw-bold d-flex align-items-center gap-2 text-primary">
						<User size={24} /> {currentUser?.fullName ? currentUser.fullName.split(' ')[0] : 'My Account'}
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="p-4 d-flex flex-column">
					<p className="text-muted small mb-4">Welcome to your Flipzon dashboard.</p>

					<div className="d-flex flex-column gap-2 mb-auto">
						<Button variant="light" className="text-start d-flex align-items-center gap-3 p-3 border-0 fw-semibold text-secondary hover-bg-light">
							<ShoppingCart size={20} className="text-primary" /> Orders
						</Button>
						<Button variant="light" className="text-start d-flex align-items-center gap-3 p-3 border-0 fw-semibold text-secondary hover-bg-light">
							<MapPin size={20} className="text-primary" /> Addresses
						</Button>
						<Button variant="light" className="text-start d-flex align-items-center gap-3 p-3 border-0 fw-semibold text-secondary hover-bg-light">
							<Phone size={20} className="text-primary" /> Support
						</Button>
					</div>

					<div className="mt-4 pt-4 border-top">
						<Button
							variant="outline-danger"
							onClick={handleLogout}
							className="w-100 py-3 fw-bold d-flex justify-content-center align-items-center gap-2 rounded-pill border-2"
						>
							<LogOut size={20} /> Logout
						</Button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>

			{/* Inline styles for simple hover effects that Bootstrap doesn't provide natively without custom CSS */}
			<style>{`
        .custom-card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .custom-card-hover:hover { transform: translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
        .custom-card-hover:hover .bg-secondary { background-color: rgba(13, 110, 253, 0.1) !important; }
      `}</style>
		</div>
	);

	return (
		<div className="font-sans antialiased">
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
			{currentView === 'login' && <LoginView />}
			{currentView === 'register' && <RegisterView />}
			{currentView === 'home' && <HomeView />}
		</div>
	);
}
