import PageNotFound from "../../views/404/PageNotFound";
import ForgetPassword from "../../views/auth/ForgetPassword";
import SignIn from "../../views/auth/SignIn";
import ActivateAccount from "../../views/ActivateAccount/ActivateAccount";
import Signup from "../../views/auth/Signup";
import AddCategory from "../../views/crud/AddCategory";
import AddOffer from "../../views/crud/AddOffer";
import AddProduct from "../../views/crud/AddProduct";
// import AddStaff from "../../views/crud/AddStaff";
// import AddWriter from "../../views/crud/AddWriter";
// import EditProfile from "../../views/crud/EditProfile";
import Dashboard from "../../views/dashboard/Dashboard";
// import AcademicLevel from "../../views/list/AcademicLevel";
import CategoryList from "../../views/list/CategoryList";
import Offers from "../../views/list/Offers";
// import MyPapers from "../../views/list/MyPapers";
import Orders from "../../views/list/Orders";
import MyProducts from "../../views/list/Products";
import AddStaff from "../../views/crud/AddStaff";
import Staff from "../../views/list/Staff";
import AdminOrders from "../../views/list/AdminOrders";
import Vendors from "../../views/list/Vendors";
// import RequestedPapers from "../../views/list/RequestedPapers";
// import StaffList from "../../views/list/StaffList";
// import StudentList from "../../views/list/StudentList";
// import WritersList from "../../views/list/WritersList";
// import OrderDetail from "../../views/orders/OrderDetail";
// import UpdateOrders from "../../views/orders/UpdateOrders";
// import MyProfile from "../../views/profile/MyProfile";

const routes = [
  {
    path: "/",
    exact: true,
    title: "Sign In",
    isLoginRequired: false,
    component: () => <SignIn />,
  },
  {
    path: "/sign-up",
    title: "Sign Up",
    isLoginRequired: false,
    component: () => <Signup />,
  },
  {
    path: "/forgot-password",
    title: "Forgot Password",
    isLoginRequired: false,
    component: () => <ForgetPassword />,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    // isLoginRequired: true,
    component: () => <Dashboard />,
  },
  // {
  //   path: "/my-profile",
  //   title: "My Profile",
  //   // isLoginRequired: true,
  //   component: () => <MyProfile />,
  // },
  // {
  //   path: "/edit-profile",
  //   title: "Edit Profile",
  //   // isLoginRequired: true,
  //   component: () => <EditProfile />,
  // },
  {
    path: "/categories",
    title: "Categories",
    // isLoginRequired: true,
    component: () => <CategoryList />,
  },
  {
    path: "/add-category",
    title: "Add Categories",
    // isLoginRequired: true,
    component: () => <AddCategory />,
  },
  {
    path: "/orders",
    title: "Orders",
    // isLoginRequired: true,
    component: () => <Orders />,
  },
  {
    path: "/admin-orders",
    title: "Orders",
    // isLoginRequired: true,
    component: () => <AdminOrders />,
  },
  {
    path: "/vendors",
    title: "Vendors",
    // isLoginRequired: true,
    component: () => <Vendors />,
  },
  // {
  //   path: "/my-papers",
  //   title: "My Papers",
  //   // isLoginRequired: true,
  //   component: () => <MyPapers />,
  // },
  // {
  //   path: "/order-details/:orderid",
  //   title: "Order Detail",
  //   // isLoginRequired: true,
  //   component: () => <OrderDetail />,
  // },
  // {
  //   path: "/update-order/:orderid",
  //   title: "Update Order",
  //   // isLoginRequired: true,
  //   component: () => <UpdateOrders />,
  // },
  // {
  //   path: "/student-list",
  //   title: "Student List",
  //   // isLoginRequired: true,
  //   component: () => <StudentList />,
  // },
  // {
  //   path: "/staff-list",
  //   title: "Staff List",
  //   // isLoginRequired: true,
  //   component: () => <StaffList />,
  // },
  // {
  //   path: "/add-writer",
  //   title: "Add Writers",
  //   // isLoginRequired: true,
  //   component: () => <AddWriter />,
  // },
  // {
  //   path: "/writer-list",
  //   title: "Writer List",
  //   isLoginRequired: true,
  //   component: () => <WritersList />,
  // },
  {
    path: "/staff",
    title: "Staff",
    // isLoginRequired: true,
    component: () => <Staff />,
  },
  {
    path: "/add-staff",
    title: "Add staff",
    // isLoginRequired: true,
    component: () => <AddStaff />,
  },
  {
    path: "/my-products",
    title: "Add staff",
    // isLoginRequired: true,
    component: () => <MyProducts />,
  },
  {
    path: "/add-product",
    title: "Add Product",
    // isLoginRequired: true,
    component: () => <AddProduct />,
  },
  {
    path: "/add-offers",
    title: "Add Offer",
    // isLoginRequired: true,
    component: () => <AddOffer />,
  },
  {
    path: "/offers",
    title: "Offers",
    // isLoginRequired: true,
    component: () => <Offers />,
  },
  {
    path: "/authentication/activate/:token",
    title: "Verify Account",
    // isLoginRequired: true,
    component: () => <ActivateAccount />,
  },
  // {
  //   path: "/requested-papers",
  //   title: "Requested Papers",
  //   // isLoginRequired: true,
  //   component: () => <RequestedPapers />,
  // },
  // {
  //   path: "/academic-levels",
  //   title: "Academic Level",
  //   // isLoginRequired: true,
  //   component: () => <AcademicLevel />,
  // },
  {
    path: "*",
    title: "Page Not Found",
    // isLoginRequired: false,
    component: () => <PageNotFound />,
  },
];

export default routes;
