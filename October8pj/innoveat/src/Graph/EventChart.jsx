import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import "./EventChart.css";

function EventChart() {
  const chartRef = useRef(null);
  const myChart = useRef(null);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get('http://localhost/Integ_Prog_DBCon/package.php');
        if (response.data && response.data.status === 'success') {
          setPackageData(response.data.packages); // Assuming the backend returns {status: 'success', packages: [...]}
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackageData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChart.current) {
      myChart.current.destroy();
    }

    // Calculate percentage of selected users for each package type
    const labels = packageData.map(pkg => pkg.package_type); // Get package types for labels
    const dataPoints = packageData.map(pkg => {
      const selectedUserCount = pkg.selected_user_count || 0;
      const totalUserCount = pkg.total_user_count || 1; // Avoid division by zero
      return ((selectedUserCount / totalUserCount) * 100).toFixed(2); // Percentage calculation
    });

    myChart.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Use the labels array created above
        datasets: [{
          label: 'Selected Package Percentage',
          data: dataPoints, // Use the dynamically calculated dataPoints
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)', 'rgba(255, 159, 64, 0.7)', 'rgba(255, 205, 86, 0.7)', 
            'rgba(75, 192, 192, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(153, 102, 255, 0.7)',
            'rgba(201, 203, 207, 0.7)'
          ],
          borderColor: [
            'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 
            'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: 'black', font: { size: 14 }, callback: value => `${value}%` },
            grid: { color: 'rgba(0, 0, 0, 0.3)', lineWidth: 1 }
          },
          x: {
            ticks: { color: 'black', font: { size: 14 }},
            grid: { color: 'rgba(0, 0, 0, 0.3)', lineWidth: 1 }
          }
        },
        plugins: {
          legend: { labels: { color: 'black' }}
        }
      }
    });

    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [packageData]); // The chart updates whenever packageData changes

  return (
    <>
      <Navbar />
      <div className="background-image-flex flex-column align-items-center">
        <h1 className="text-center mt-4">EVENT CHART</h1>
        <div 
          className="chart-container" 
          style={{ 
            position: 'relative', height: '500px', width: '70%', maxWidth: '800px',
            border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '8px', overflow: 'hidden',
            backgroundColor: 'white', padding: '20px'
          }}
        >
          <canvas id="myChart" ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
    </>
  );
}

export default EventChart;
