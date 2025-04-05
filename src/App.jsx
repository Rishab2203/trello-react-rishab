import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BoardInfo from "./pages/BoardInfo";
import { Toaster } from "sonner";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/boards/:boardId",
      element: <BoardInfo />,
    },
  ]);
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
