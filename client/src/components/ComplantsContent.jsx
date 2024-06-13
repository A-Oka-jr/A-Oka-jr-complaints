import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplantsContent = () => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientRef: "",
    userRef: "",
    title: "",
    comment: "",
    description: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await axios.get("api/client/getAll");
        const data = response.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setClients(data.clients);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    const fetchUsers = async () => {
      setError(false);
      try {
        setLoading(true);
        const response = await axios.get("api/user/getAllUsers");
        const data = response.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchUsers();
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post("api/complaint/create", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;

      if (data.success === false) {
        toast.error(
          data.message || "An error occurred while submitting the complaint."
        );
        console.log(data.message);
        setLoading(false);
        setError(true);
        return;
      }

      toast.success("Complaint submitted successfully!");
      setLoading(false);
      setFormData({
        clientRef: "",
        userRef: "",
        title: "",
        comment: "",
        description: "",
      });
    } catch (error) {
      toast.error("An error occurred while submitting the complaint.");
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Add Comaplaint</h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="clientRef"
          >
            Client Name
          </label>
          <select
            id="clientRef"
            name="clientRef"
            value={formData.clientRef}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option className="text-gray-700" value="">
              Select a name
            </option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userRef"
          >
            Emploee Name
          </label>
          <select
            id="userRef"
            name="userRef"
            value={formData.userRef}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option className="text-gray-700" value="">
              Select a Emploee
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Complaint Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Complaint title"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Complaint comment
          </label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Complaint comment"
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
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your Description"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplantsContent;
