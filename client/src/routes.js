import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Base from "./pages/home/Base";
import NotFound from "./shared/NotFound";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";
import ManageQuestions from "./pages/admin/questions/ManageQuestions";
import AddQuestions from "./pages/admin/questions/AddQuestions";
import UpdateQuestions from "./pages/admin/questions/UpdateQuestions";
import ListOfQuestions from "./pages/admin/list/ListOfQuestions";//show
import ManageAnswer from "./pages/admin/answers/ManageAnswer";
import AddAnswer from "./pages/admin/answers/AddAnswer";
import UpdateAnswer from "./pages/admin/answers/UpdateAnswer";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Base />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      /////////////////////////admin///////////////
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/question",
        children: [
          {
            path: "",
            element: <ManageQuestions />,
          },
          {
            path: "add",
            element: <AddQuestions />,
          },
          {
            path: ":id",
            element: <UpdateQuestions />,
          },
          {
            path: "list",
            element: <ListOfQuestions />,
          },
        ],
      },
      {
        path: "/admin/response",
        children: [
          {
            path: "",
            element: <ManageAnswer />,
          },
          {
            path: "add",
            element: <AddAnswer />,
          },
          {
            path: ":id",
            element: <UpdateAnswer />,
          },
          {
            path: "list",
            element: <ListOfQuestions />,
          },
        ],
      },

      ///////////////////////////admin////////////////
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);