import React from "react";
import Statistical from '../../components/Statistical/Statistical';
import { CChart } from '@coreui/react-chartjs';

function Home(props) {
  return (
    <div>
      <h2>Thống Kê</h2>
      <Statistical />
    </div>
  );
}

export default Home;
