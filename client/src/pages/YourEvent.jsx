import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { IoMdEye } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import Navbar from "../components/Navbar";
import Loader from "../components/Loding";

function YourEvent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cancelEvent, setCancelEvent] = useState(null);
  const [type, setType] = useState("");

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const confirmCancel = async () => {
    try {
      const token = Cookies.get("token");
      const url = `${process.env.REACT_APP_API_URL}/cancel/${cancelEvent}`;

      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setCancelEvent(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const canelEventHandle = (eventId) => {
    setCancelEvent(eventId);
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
          `${process.env.REACT_APP_API_URL}/dashboard?type=${type}`,
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
  }, [type, cancelEvent]);

  return (
    <>
      <Navbar />
      {loading && <Loader />}

      <div className="p-5">
        <label htmlFor="type" className="text-gray-800 font-bold mb-5">
          Formate events
        </label>
        <select id="type" className="ml-5 mb-5" onChange={onChangeType}>
          <option value="" defaultChecked>
            select
          </option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>

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
                    className="w-full flex justify-center mb-1 bg-pink-500 text-white p-2 rounded-md hover:bg-pink-400 transition duration-200"
                    onClick={() => canelEventHandle(eachData.id)}>
                    <IoIosCloseCircle />
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
                    className="w-1/3 mb-1 bg-pink-500 text-white p-2 rounded-md hover:bg-pink-400 transition duration-200"
                    onClick={() => canelEventHandle(eachData.id)}>
                    Cancel Event
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

      {cancelEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h1 className="text-lg font-bold">
              are you sure to cancel the event.
            </h1>
            <button
              onClick={confirmCancel}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Coinfirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default YourEvent;
