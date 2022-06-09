import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useUserToken() {
  const [user] = useAuthState(auth);
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setUserToken(token);
      });
    }
  }, [user]);

  return userToken;
}
