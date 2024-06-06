import ReportComponent from "./ReportComponent";
import { useState, useEffect } from "react";
import axios from "axios";

const ReportsContent = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await axios.get("api/complaint/getAll");
        const data = response.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setComplaints(data.complaints);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchComplaints();
  }, []);
  return (
    <div>
      <div className="text-center text-bold">
        {loading && <p>Loading...</p>}
      </div>
      <div className="text-center text-red-500">
        {error && <p>Error occurred while fetching complaints.</p>}
      </div>
      <ReportComponent complaints={complaints} />
    </div>
  );
};

export default ReportsContent;
