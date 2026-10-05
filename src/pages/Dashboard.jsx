import { Card, Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <h3 className="mb-4">Ringkasan</h3>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm p-3 border-0">
            <Card.Subtitle className="text-muted mb-2">All Sales</Card.Subtitle>
            <Card.Title className="fs-3 fw-bold text-success">Rp. 375,928,547</Card.Title>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3 border-0">
            <Card.Subtitle className="text-muted mb-2">All Sales</Card.Subtitle>
            <Card.Title className="fs-3 fw-bold text-success">Rp. 415,268,913</Card.Title>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3 border-0">
            <Card.Subtitle className="text-muted mb-2">All Sales</Card.Subtitle>
            <Card.Title className="fs-3 fw-bold text-success">Rp. 4,201,917</Card.Title>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard;