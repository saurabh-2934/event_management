import Navbar from "../components/Navbar";

function Profile() {
  const savedUser = localStorage.getItem("user");
  const user = JSON.parse(savedUser);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center w-100">
        <div className="min-w-1/2 p-8 flex flex-col items-center justify-center rounded-lg shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1640951613773-54706e06851d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D"
            alt={user.name}
            className="h-30, w-24 rounded-full mb-10"
          />

          <p className="text-gray-800 text-xl font-bold">Name: {user.name} </p>
          <p className="text-gray-800 text-xl font-bold">Email: {user.email}</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
