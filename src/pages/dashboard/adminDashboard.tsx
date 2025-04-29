import { Card, Row } from "reactstrap";
import TestIcon from '../../assets/images/testsicon.svg';
import './dashboard.css';

export default function Dashboard() {
    return (
        <Row className="w-100 h-100 m-0 p-0 max-width">
            <Card className="max-width p-0 card-layout">
                <div className="dashboard-card-layout-container">
                    <div className="dashboard-title">
                        Dashboard
                    </div>
                    <div className="dashboard-card-container">
                        <Card className="total-test-card">
                            <div className="total-test-card-container">
                                <div className="test-icon-container flex-center">
                                    <img src={TestIcon} alt="Testing icon" />
                                </div>
                                <div className="total-test-title">
                                    Total Tests Conducted
                                </div>
                                <div className="total-test-count">
                                    Counts
                                </div>
                            </div>
                        </Card>
                        <div className="test-conducted-row">
                            <div className="test-conducted-title">
                                Test Conducted
                            </div>
                            <div className="test-card-row">
                                Count
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Row>
    );
};