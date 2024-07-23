
import { Route, Routes } from "react-router-dom";
import PageNotExist from "./PageNotExist";
import HomePage from "./HomePage"
import TripsView from "./TripsView";
import JournalView from "./JournalView";

const AppRoutes = () => {
  const authorizedRoutes =[]// [{ path: "/store", Component: Store }];

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/homePage" element={<HomePage />}></Route>  
      <Route path="/tripsView" element={<TripsView />}></Route>  
      <Route path="/journalView/:tripId" element={<JournalView />}></Route>  
      {authorizedRoutes.map((route) => {
        //const userLoggedIn = !!user?.userToken;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              // userLoggedIn ? (
              //   <route.Component></route.Component>
              // ) : (
                //<HomePage></HomePage>
                <div></div>
             // )
            }
          />
        );
      })}
      <Route path="*" element={<PageNotExist />}></Route>
    </Routes>
  );
};

export default AppRoutes;
