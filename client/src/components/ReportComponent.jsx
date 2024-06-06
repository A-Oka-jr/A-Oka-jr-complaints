import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReportComponent = ({ complaints }) => {
  const reportRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const complaintsPerPage = 5;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const generatePDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10; // margin from top

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("complaints_report.pdf");
    });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const statusColors = {
    1: "bg-red-100 hover:bg-red-300",
    2: "bg-green-100 hover:bg-green-300",
    3: "bg-blue-100 hover:bg-blue-300",
  };

  const filterComplaints = () => {
    return complaints.filter((complaint) => {
      const matchesUser = userName
        ? complaint.userRef.name.toLowerCase().includes(userName.toLowerCase())
        : true;
      const matchesClient = clientName
        ? complaint.clientRef.name
            .toLowerCase()
            .includes(clientName.toLowerCase())
        : true;
      const matchesStartDate = startDate
        ? new Date(complaint.createdAt) >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? new Date(complaint.createdAt) <= new Date(endDate)
        : true;
      const matchesStatus = status
        ? complaint.status.toString() === status
        : true;
      return (
        matchesUser &&
        matchesClient &&
        matchesStartDate &&
        matchesEndDate &&
        matchesStatus
      );
    });
  };

  const filteredComplaints = filterComplaints();
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * complaintsPerPage,
    currentPage * complaintsPerPage
  );
  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter Complaints</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="User ID"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Client ID"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="1">Opened</option>
            <option value="2">Closed</option>
            <option value="3">On Going</option>
          </select>
        </div>
      </div>

      <div
        ref={reportRef}
        style={{ padding: 20, backgroundColor: "#f5f5f5", borderRadius: 5 }}
      >
        <h1 className="text-2xl font-semibold mb-4">Complaints Report</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Date
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Assign To
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Client Name
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Location
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Title
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Description
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Comment
                </th>
                <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedComplaints.map((complaint, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${statusColors[complaint.status]}`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {formatDate(complaint.createdAt)}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {complaint.userRef.name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {complaint.clientRef.name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {complaint.clientRef.location}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {complaint.title}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {complaint.description}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {complaint.comment}
                  </td>
                  <td className="py-4 px-6">
                    <span className="py-1 px-3 rounded-full text-xs font-semibold">
                      {complaint.status === 1
                        ? "Opened"
                        : complaint.status === 2
                        ? "Closed"
                        : "On Going"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generatePDF}
      >
        Download as PDF
      </button>
    </div>
  );
};

export default ReportComponent;
