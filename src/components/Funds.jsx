import React from 'react';
import './Funds.css';  // Custom CSS for additional styling if needed

const Funds = () => {
    return (
        <div className="funds-container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card funds-section equity-section">
                        <div className="card-body">
                            <h5 className="card-title">Equity</h5>
                            <div className="fund-info">
                                <p>Available margin</p>
                                <h4>1,00,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Used margin</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Available cash</p>
                                <h4>1,00,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Realized P&L</p>
                                <h4>2,500.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Unrealized P&L</p>
                                <h4>-1,200.00</h4>
                            </div>
                            <hr />
                            <div className="fund-info">
                                <p>Opening balance</p>
                                <h4>1,00,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Payin</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Payout</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>SPAN</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Delivery margin</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Exposure</p>
                                <h4>0.00</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card funds-section commodity-section">
                        <div className="card-body">
                            <h5 className="card-title">Commodity</h5>
                            <div className="fund-info">
                                <p>Available margin</p>
                                <h4>50,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Used margin</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Available cash</p>
                                <h4>50,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Realized P&L</p>
                                <h4>1,200.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Unrealized P&L</p>
                                <h4>-300.00</h4>
                            </div>
                            <hr />
                            <div className="fund-info">
                                <p>Opening balance</p>
                                <h4>50,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Payin</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Payout</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>SPAN</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Delivery margin</p>
                                <h4>0.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Exposure</p>
                                <h4>0.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row total-collateral">
                <div className="col-md-12">
                    <div className="card funds-section">
                        <div className="card-body">
                            <h5 className="card-title">Total Collateral</h5>
                            <div className="fund-info">
                                <p>Total Margin Available</p>
                                <h4>1,50,000.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Total Realized P&L</p>
                                <h4>3,700.00</h4>
                            </div>
                            <div className="fund-info">
                                <p>Total Unrealized P&L</p>
                                <h4>-1,500.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Funds;
