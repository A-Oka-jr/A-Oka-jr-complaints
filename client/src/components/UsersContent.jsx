import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const usersPerPage = 5;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteClick = async (id) => {
    if (confirm("Are you sure you want to delete this User?")) {
      try {
        await axios.delete(`api/user/deleteUser/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
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

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingUser({ name: "", email: "" });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      setLoading(true);
      let res;
      if (editingUser._id) {
        res = await axios.put(
          `api/user/updateUser/${editingUser._id}`,
          editingUser
        );
      } else {
        res = await axios.post(`api/user/createUser`, editingUser);
      }
      const data = res.data;
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        if (editingUser._id) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === editingUser._id ? editingUser : user
            )
          );
        } else {
          setUsers((prevUsers) => [...prevUsers, data.user]);
        }
        handleModalClose();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("api/user/getAllUsers");
        const data = res.data;

        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        setUsers(data.users);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  console.log(typeof users);

  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(users.length / usersPerPage);

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
          Over All <span className="text-red-700"> {users.length} </span>
          Users
        </h2>
      </div>
      <div>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                User Name
              </th>
              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                User Email
              </th>
              <th className="py-3 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={index}
                className={`cursor-pointer hover:bg-gray-300`}
                // onClick={() => handleRowClick(complaint._id)}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 w-full mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteClick(user._id)}
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
            <h2 className="text-2xl font-bold mb-4">
              {editingUser._id ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  User Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={editingUser.email}
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

export default UsersContent;
