import { Suspense, lazy } from "react";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const Dev = lazy(() => import("./pages/Dev"));
const Casual = lazy(() => import("./pages/Casual"));

function App() {
  const path = window.location.pathname;

  let Route = Home;

  if (path === "/dev") Route = Dev;
  if (path === "/casual") Route = Casual;

  return (
    <Suspense
      fallback={<main className="min-h-screen bg-[#0b1320]" aria-busy="true" />}
    >
      <Route />
    </Suspense>
  );
}

export default App;
