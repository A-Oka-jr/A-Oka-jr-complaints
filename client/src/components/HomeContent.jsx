import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeContent = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);

  const complaintsPerPage = 5;

  const statusColors = {
    1: "bg-red-100 hover:bg-red-300",
    2: "bg-green-100 hover:bg-green-300",
    3: "bg-blue-100 hover:bg-blue-300",
  };

  // const handleRowClick = (id) => {
  //   alert(`You clicked on ${id}`);
  // };

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

  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure you want to delete this complaint?")) {
      try {
        setLoading(true);
        setError(false);
        await axios.delete(`api/complaint/delete/${id}`);
        setComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint._id !== id)
        );
        toast.success("Complaint deleted successfully!");
        setError(false);
        setLoading(false);
      } catch (error) {
        toast.error("An error occurred while deleting the complaint.");
        console.log(error);
        setError(true);
      }
    }
  };

  const handleEditClick = (complaint) => {
    setEditingComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingComplaint(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      setLoading(true);
      const res = await axios.put(
        `api/complaint/update/${editingComplaint._id}`,
        editingComplaint
      );
      const data = res.data;
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === data.complaint._id ? data.complaint : complaint
        )
      );
      handleModalClose();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedComplaints = complaints.slice(
    (currentPage - 1) * complaintsPerPage,
    currentPage * complaintsPerPage
  );
  const totalPages = Math.ceil(complaints.length / complaintsPerPage);
  console.log(complaints);

  const countStatus = (status) => {
    return complaints.filter((complaint) => complaint.status === status).length;
  };
  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Employee Status Table</h1>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong
        </p>
      )}
      <div className="flex justify-between mb-4">
        <div className="text-right">
          <h2 className="text-md font-semibold">
            Opend
            <span className="font-semibold text-xl text-red-700">
              {` ` + countStatus(1) + ` `}
            </span>
            Complaints
          </h2>
        </div>

        <div className="text-right">
          <h2 className="text-md font-semibold">
            On Going
            <span className="font-semibold text-xl text-green-700">
              {` ` + countStatus(2) + ` `}
            </span>
            Complaints
          </h2>
        </div>

        <div className="text-right">
          <h2 className="text-md font-semibold">
            Closed
            <span className="font-semibold text-xl text-blue-700">
              {` ` + countStatus(3) + ` `}
            </span>
            Complaints
          </h2>
        </div>

        <div className="text-right">
          <h2 className="text-md font-semibold">
            Over All
            <span className="font-semibold text-xl text-gray-700">
              {` ` + complaints.length + ` `}
            </span>
            Complaints
          </h2>
        </div>
      </div>

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
              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedComplaints.map((complaint, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${statusColors[complaint.status]}`}
                // onClick={() => handleRowClick(complaint._id)}
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
                      ? "On Going"
                      : complaint.status === 3
                      ? "Closed"
                      : ""}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(complaint)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 w-full mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteClick(complaint._id)}
                  >
                    Delete
                  </button>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit Complaint</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  name="title"
                  value={editingComplaint.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  value={editingComplaint.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="comment"
                >
                  Comment
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="comment"
                  name="comment"
                  value={editingComplaint.comment}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="status"
                  name="status"
                  value={editingComplaint.status}
                  onChange={handleInputChange}
                >
                  <option value={1}>Opened</option>
                  <option value={2}>On Going</option>
                  <option value={3}>Closed</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
