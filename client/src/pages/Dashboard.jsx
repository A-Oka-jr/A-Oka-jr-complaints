import { useState } from "react";
import UsersContent from "../components/UsersContent";
import ClientsContent from "../components/ClientsContent";
import ComplantsContent from "../components/ComplantsContent";
import FeedbackContent from "../components/FeedbackContent";
import ReportsContent from "../components/ReportsContent";
import HomeContent from "../components/HomeContent";
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailuar,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";

function Dashboard() {
  // State to keep track of the current section
  const [currentSection, setCurrentSection] = useState("Home");
  const dispatch = useDispatch();

  // Function to render the content based on the current section
  const renderContent = () => {
    switch (currentSection) {
      case "Home":
        return <HomeContent />;
      case "Users":
        return <UsersContent />;
      case "Clients":
        return <ClientsContent />;
      case "Complants":
        return <ComplantsContent />;
      case "Feedback":
        return <FeedbackContent />;
      case "Reports":
        return <ReportsContent />;
      default:
        return <HomeContent />;
    }
  };

  const handelSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get(`/api/auth/signout`);

      if (res.success === false) {
        dispatch(signOutUserFailuar(res.message));
        return;
      }
      dispatch(signOutUserSuccess(res));
    } catch (error) {
      dispatch(signOutUserFailuar(error.message));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col h-full">
        <div className="p-4 font-bold text-lg">Dashboard</div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setCurrentSection("Home")}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Home
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setCurrentSection("Users")}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Users
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setCurrentSection("Clients")}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Clients
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setCurrentSection("Complants")}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Complaints
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setCurrentSection("Feedback")}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Feedback
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setCurrentSection("Reports")}
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Reports
              </button>
            </li>
            <li>
              <button
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                onClick={handelSignOut}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Button
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Dashboard;
