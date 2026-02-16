import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { IoMdEye } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import Navbar from "../components/Navbar";
import Loader from "../components/Loding";

const locations = [
  { id: 1, city: "Hyderabad" },
  { id: 2, city: "Bangalore" },
  { id: 3, city: "Mumbai" },
  { id: 4, city: "Delhi" },
  { id: 5, city: "Pune" },
  { id: 6, city: "Chennai" },
  { id: 7, city: "Ahmedabad" },
  { id: 8, city: "Kolkata" },
];

const categories = [
  { id: "c1", type: "Music" },
  { id: "c2", type: "Sports" },
  { id: "c3", type: "Tech" },
  { id: "c4", type: "Education" },
  { id: "c5", type: "Business" },
];

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert DD-MM-YYYY to proper JS Date
  const convertToDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-");
    return new Date(year, month - 1, day);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput);
    }
  };

  const onChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const confirmRegistration = async () => {
    try {
      const token = Cookies.get("token");
      const url = `${process.env.REACT_APP_API_URL}/register/${registerEvent}`;

      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        window.alert("Event regisesterd");
        setRegisterEvent(null);
      }
    } catch (err) {
      window.alert(err.response?.data.error_msg);
      setRegisterEvent(null);
    }
  };

  const onRegister = (eventId) => {
    setRegisterEvent(eventId);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events?search=${searchQuery}&location=${location}&category=${category}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setData(response.data.data);
      } catch (err) {
        console.log("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [searchQuery, location, registerEvent, category]);

  return (
    <>
      <Navbar />
      {loading && <Loader />}

      <div className="p-5">
        <div className="flex justify-center items-center">
          <div className="min-w-1/4 bg-gray-200 mb-5 mr-5 p-2  flex items-center justify-between rounded-lg border-2 border-gray-200">
            <input
              type="search"
              placeholder="search for event..."
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none w-full"
            />
            <button
              type="button"
              className="font-bold text-xl"
              onClick={handleSearch}>
              <CiSearch />
            </button>
          </div>
          <label htmlFor="type" className="text-gray-800 font-bold mb-5">
            Filter by location
          </label>
          <select id="type" className="ml-5 mb-5" onChange={onChangeLocation}>
            <option value="" defaultChecked>
              select
            </option>
            {locations.map((eachData) => {
              return (
                <option key={eachData.id} value={eachData.city}>
                  {eachData.city}
                </option>
              );
            })}
          </select>

          <label
            htmlFor="category"
            className="text-gray-800 font-bold mb-5 ml-5">
            Filter by Category
          </label>
          <select
            id="category"
            className="ml-5 mb-5"
            onChange={onChangeCategory}>
            <option value="" defaultChecked>
              select
            </option>
            {categories.map((eachData) => {
              return (
                <option key={eachData.id} value={eachData.type}>
                  {eachData.type}
                </option>
              );
            })}
          </select>
        </div>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">event name</th>
              <th className="border px-4 py-2">organizer</th>
              <th className="border px-4 py-2">date</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachData) => (
              <tr key={eachData.id}>
                <td className="border px-4 py-2">{eachData.name}</td>
                <td className="border px-4 py-2">{eachData.organizer}</td>
                <td className="border px-4 py-2">{eachData.date}</td>
                <td className="flex flex-col items-center justify-center border px-4 py-2 block md:hidden">
                  <button
                    type="button"
                    className="w-full flex justify-center mb-1 bg-sky-500/100 text-white p-2 rounded-md hover:bg-sky-500/50 transition duration-200"
                    onClick={() => handleView(eachData)}>
                    <IoMdEye />
                  </button>
                  <button
                    type="button"
                    disabled={
                      eachData.availableSeats === 0 ||
                      convertToDate(eachData.date) < today
                    }
                    className={`w-1/3 mb-1 text-white p-2 rounded-md transition duration-200
                        ${eachData.availableSeats === 0 || convertToDate(eachData.date) < today ? "bg-gray-400" : "bg-indigo-500 hover:bg-fuchsia-500"}
                    `}
                    onClick={() => onRegister(eachData.id)}>
                    {eachData.availableSeats === 0 ||
                    convertToDate(eachData.date) < today ? (
                      <IoCloseCircle />
                    ) : (
                      <IoAddCircle />
                    )}
                  </button>
                </td>

                <td className="flex items-center justify-between border px-4 py-2 hidden md:block">
                  <button
                    type="button"
                    className="w-1/4 mb-1 mr-4 bg-sky-500/100 text-white p-2 rounded-md hover:bg-sky-500/50 transition duration-200"
                    onClick={() => handleView(eachData)}>
                    View Event
                  </button>
                  <button
                    type="button"
                    disabled={
                      eachData.availableSeats === 0 ||
                      convertToDate(eachData.date) < today
                    }
                    className={`w-1/3 mb-1 text-white p-2 rounded-md transition duration-200
                        ${eachData.availableSeats === 0 || convertToDate(eachData.date) < today ? "bg-gray-400" : "bg-indigo-500 hover:bg-fuchsia-500"}
                    `}
                    onClick={() => onRegister(eachData.id)}>
                    {eachData.availableSeats === 0 ||
                    convertToDate(eachData.date) < today
                      ? "Not available"
                      : "Register now"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Event Details</h2>

            <p>
              <strong>Name:</strong> {selectedEvent.name}
            </p>
            <p>
              <strong>Organizer:</strong> {selectedEvent.organizer}
            </p>
            <p>
              <strong>Category:</strong> {selectedEvent.category}
            </p>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p>
              <strong>Capacity:</strong> {selectedEvent.capacity}
            </p>
            <p>
              <strong>Available Seats:</strong> {selectedEvent.availableSeats}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>

            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {registerEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h1 className="text-lg font-bold">
              click on coinfion for register event.
            </h1>
            <button
              onClick={confirmRegistration}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Coinfirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
