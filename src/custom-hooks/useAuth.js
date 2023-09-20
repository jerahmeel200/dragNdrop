import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});
  console.log(auth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user, "user");
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  });

  return {
    currentUser,
  };
};

export default useAuth;
