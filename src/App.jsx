import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";

export default function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/TransportationForecasting/" element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path="/TransportationForecasting/:name" element={<MainPage/>}/>
    </Route>
  ));

  return (
    <RouterProvider router={router} />
  );
}
