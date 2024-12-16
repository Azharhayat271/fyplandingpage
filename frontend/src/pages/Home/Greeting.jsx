// Greeting.js
import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import carrotAnimation from './../../assets/json/greeting.json'; // Adjust the path as needed

const Greeting = () => {
    const name = localStorage.getItem('name') || 'User';
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour < 18) {
        greeting = 'Good Afternoon';
    } else if (currentHour < 21) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Good Night';
    }

    return (
        <motion.div
            className="bg-light text-dark p-5 rounded d-flex align-items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8f9fa' }}
        >
            <Lottie 
                animationData={carrotAnimation} 
                style={{ width: '250px', position: 'absolute', right: '20px', top: '20px' }} 
            />
            <div>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'Arial, sans-serif', color: '#007bff' }}>Hello, {name}</h1>
                <p style={{ fontSize: '1.8rem', fontFamily: 'Arial, sans-serif', color: '#007bff' }}>{greeting}!</p>
            </div>
        </motion.div>
    );
};

export default Greeting;
