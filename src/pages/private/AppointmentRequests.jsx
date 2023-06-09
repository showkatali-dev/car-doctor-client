import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import Banner2 from "../../components/Banner2";

const AppointmentRequests = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const token = localStorage.getItem("car-doctor-token");

  useEffect(() => {
    if (user && token) {
      fetch(`http://localhost:5001/api/appointments?email=${user.email}`, {
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) logoutUser();
          else setAppointmentRequests(data);
        })
        .catch((err) => console.error(err));
    }
  }, [user, logoutUser, token]);

  const handleDeleteAppointment = (id) => {
    fetch(`http://localhost:5001/api/appointments/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setAppointmentRequests((requests) =>
            requests.filter((request) => request._id !== id)
          );
          Swal.fire({
            icon: "success",
            text: "Appointment request deleted successfully",
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto px-4 mt-4 mb-12">
      <Banner2 title="Appointment Requests">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        /Appointment-Requests
      </Banner2>

      {appointmentRequests.length === 0 && (
        <p className="text-center py-14 text-error font-medium">
          You did not requested for any services
        </p>
      )}

      <table className="w-full my-12">
        <tbody>
          {appointmentRequests.map((request) => (
            <tr key={request._id}>
              <td
                onClick={() => handleDeleteAppointment(request._id)}
                className="p-2"
              >
                <button className="btn btn-circle btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
              <td className="p-2">
                <img
                  src={request.img}
                  alt=""
                  className="w-28 aspect-square object-cover rounded-md"
                />
              </td>
              <td className="p-2">{request.service}</td>
              <td className="p-2">{request.cost}</td>
              <td className="p-2">{request.data}</td>
              <td className="p-2">
                {request.approved ? "Approved" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentRequests;
