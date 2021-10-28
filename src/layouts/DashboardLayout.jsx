import { Redirect, Route } from "react-router-dom";
import TopBar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <>
      <TopBar />
      <div className="container">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  const authenticated = !!JSON.parse(localStorage.getItem("access_token"));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          return (
            <DashboardLayout>
              <Component {...props} />
            </DashboardLayout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default DashboardLayoutRoute;
