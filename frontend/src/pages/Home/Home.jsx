// Dashboard.js
import React from 'react';
import Greeting from './Greeting';
import Calendar from './Calender';

const Dashboard = () => {
    return (
        <div className="container">
           <Greeting />
            <div className="row mt-4">
                <div className="col-12">
                    <Calendar />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
