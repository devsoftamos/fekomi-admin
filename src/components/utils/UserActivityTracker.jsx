import { useEffect, useCallback } from "react";

import { useLocation, useNavigate } from "react-router-dom";

var activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
];

const UserActivityTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activityWatcher = useCallback(() => {
    let activityInterval = 0;
    const TIMEOUT = 1000 * 60 * 15;

    const authToken = localStorage.getItem("fekomiAuthToken");
    const token = localStorage.getItem("fekomi-token");
    if (!token || !authToken) {
      navigate("/");
    }

    const intervalId = setInterval(() => {
      activityInterval++;

      if (activityInterval > TIMEOUT / 1000) {
        localStorage.removeItem("fekomiAuthToken");
        localStorage.removeItem("fekomi-token");
        navigate("/");
        activityInterval = 0;
      }
    }, 1000);

    const resetInterval = () => {
      activityInterval = 0;
    };

    activityEvents.forEach((activity) => {
      window.addEventListener(activity, resetInterval, { passive: true });
    });

    return () => {
      clearInterval(intervalId);
      activityEvents.forEach((activity) => {
        window.removeEventListener(activity, resetInterval);
      });
    };
  }, []);

  useEffect(() => {
    const whitelist = ["/", "/signup", "/forget-password"];

    if (!whitelist.includes(location.pathname)) {
      return activityWatcher();
    }

    return undefined;
  }, [location.pathname]);

  return null;
};

export default UserActivityTracker;
