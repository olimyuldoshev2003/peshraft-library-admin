import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Books from "./pages/books/Books";
import Members from "./pages/members/Members";
import BorrowedBooks from "./pages/borrowedBooks/BorrowedBooks";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";
import SignIn from "./pages/signIn/SignIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "books",
          element: <Books />,
        },
        {
          path: "members",
          element: <Members />,
        },
        {
          path: "borrowed-books",
          element: <BorrowedBooks />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
