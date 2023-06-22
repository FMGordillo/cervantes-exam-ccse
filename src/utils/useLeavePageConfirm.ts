import { useEffect } from "react";
import Router from "next/router";

export const useLeavePageConfirm = (
  shouldConfirm = true,
  message = "Are you sure want to leave this page?"
) => {
  useEffect(() => {
    const handleBrowseAway = () => {
      if (shouldConfirm && !window.confirm(message)) {
        Router.events.emit("routeChangeError");
        throw "Route Canceled";
      }
    };

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!shouldConfirm) return;

      e.preventDefault();

      if (!window.confirm(message)) {
        e.returnValue = message;
      }
    };

    Router.events.on("routeChangeStart", handleBrowseAway);
    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      Router.events.off("routeChangeStart", handleBrowseAway);
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, [shouldConfirm, message]);
};
