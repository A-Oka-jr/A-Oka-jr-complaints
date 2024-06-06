import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClientsContent = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const clientsPerPage = 5;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure you want to delete this User?")) {
      try {
        await axios.delete(`api/client/delete/${id}`);
        setClients((prevClients) =>
          prevClients.filter((client) => client._id !== id)
        );
        toast.success("client deleted successfully!");
        setLoading(false);
        setError(false);
      } catch (error) {
        toast.error("An error occurred while deleting the complaint.");
        setError(true);
        setLoading(false);
      }
    }
  };

  const handleEditClick = (clients) => {
    setEditingClient(clients);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      setLoading(true);
      let res;
      if (editingClient._id) {
        res = await axios.put(
          `api/client/update/${editingClient._id}`,
          editingClient
        );
      } else {
        res = await axios.post(`api/client/create`, editingClient);
      }
      const data = res.data;
      setLoading(false);

      if (data.success === false) {
        toast.error(
          data.message ||
            "An error occurred while submitting the Client. Please try again."
        );
        setLoading(false);
        setError(true);
      } else {
        if (editingClient._id) {
          setClients((prevClients) =>
            prevClients.map((client) =>
              client._id === editingClient._id ? editingClient : client
            )
          );
          toast.success("Client submitted successfully!");
          setLoading(false);
        } else {
          setClients((prevClients) => [...prevClients, data.client]);
        }
        handleModalClose();
      }
    } catch (error) {
      toast.error("An error occurred while submitting the Client.");
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };
  const handleAddClick = () => {
    setEditingClient({ name: "", email: "", phone: "", location: "" });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingClient((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await axios.get("api/client/getAll");
        const data = res.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setClients(data.clients);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchClients();
  }, []);
  console.log(clients);

  const paginatedClients = clients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  const totalPages = Math.ceil(clients.length / clientsPerPage);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Users Table</h1>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">
          Something went wrong
        </p>
      )}
      <div className="text-right">
        <h2 className="text-2xl font-semibold">
          Over All <span className="text-red-700"> {clients.length} </span>
          Clients
        </h2>
      </div>
      <div>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Client
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Client Name
              </th>
              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Client Email
              </th>

              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Client Location
              </th>

              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Client Phone
              </th>

              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map((clients, index) => (
              <tr
                key={index}
                className={`cursor-pointer hover:bg-gray-300`}
                // onClick={() => handleRowClick(complaint._id)}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {clients.name}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {clients.email}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {clients.location}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {clients.phone}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(clients)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 w-full mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteClick(clients._id)}
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
                  htmlFor="name"
                >
                  Client Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={editingClient.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Client Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={editingClient.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Client Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  name="location"
                  value={editingClient.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Client Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="phone"
                  name="phone"
                  value={editingClient.phone}
                  onChange={handleInputChange}
                />
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

export default ClientsContent;
