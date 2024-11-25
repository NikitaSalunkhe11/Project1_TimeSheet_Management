import { useEffect, useState } from "react";
import { auth } from "../components/firebase";

function Home() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      setUserDetails(user);
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
            <img
              src={userDetails.photoURL}
              width={"10%"}
              style={{ borderRadius: "50%" }}
            />
          {/* </div> */}
          <h3>Welcome {userDetails.displayName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
          </div>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Home;
