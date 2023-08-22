import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainDetails = ({ match }) => {
  const [train, setTrain] = useState({});

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await axios.get(
          `http://20.244.56.144/train/trains/${match.params.trainNumber}`,
          {
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN_HERE', // Replace with actual token
            },
          }
        );
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train details:', error);
      }
    };

    fetchTrainDetails();
  }, [match.params.trainNumber]);

  return (
    <div>
      <h1>Train Details</h1>
      <h2>{train.trainName}</h2>
      <p>Train Number: {train.trainNumber}</p>
      {/* Display other train details */}
    </div>
  );
};

export default TrainDetails;
