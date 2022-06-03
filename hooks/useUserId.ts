import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useUserId() {
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState<string>(user.uid);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  return userId;
}
