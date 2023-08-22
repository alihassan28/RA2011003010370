import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/train/trains', {
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN_HERE', // Replace with actual token
          },
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      <ul>
        {trains.map(train => (
          <li key={train.trainNumber}>
            {train.trainName} - {train.trainNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
