import { useState } from 'react';
import { Button, Offcanvas, Card, Container, Navbar, Nav } from 'react-bootstrap';

export default function Head() {

	const [showCanvas, handleShowCanvas] = useState(false);

	const handleShow = () => handleShowCanvas(true);
	const handleClose = () => handleShowCanvas(false);

	return (
		<div>

			<Navbar>
				<Container>
					<Navbar.Brand>
						Flipzon
					</Navbar.Brand>

					<Nav>
						<Nav.Link>
							<a href="#">Home</a>
						</Nav.Link>
						<Nav.Link>
							<a href="#">Home</a>
						</Nav.Link>
						<Nav.Link>
							<a href="#">Home</a>
						</Nav.Link>
						<Nav.Link>
							<Button onClick={handleShow}>☰</Button>
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>



			<Offcanvas show={showCanvas} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						Flipzon Menu
					</Offcanvas.Title>
				</Offcanvas.Header>

			</Offcanvas>

		</div >
	);
}
