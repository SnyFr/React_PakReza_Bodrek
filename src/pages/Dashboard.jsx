// import { Card, Container, Row, Col } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-muted/30">
        <main className="max-w-6xl mx-auto p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard POS</h2>
            <p className="text-sm text-muted-foreground">
              Welcome to Dashboard
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="shadow-lg border-border p-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Sales
                </CardTitle>
                {/* Icon */}
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </Card>
            <Card className="shadow-lg border-border p-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Sales
                </CardTitle>
                {/* Icon */}
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </Card>
            <Card className="shadow-lg border-border p-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Sales
                </CardTitle>
                {/* Icon */}
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
      {/* <Container>
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
    </Container> */}
    </>
  );
};

export default Dashboard;
