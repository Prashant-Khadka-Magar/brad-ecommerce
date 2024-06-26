import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import SearchBox from "./SearchBox";
function Header() {
  const { total_items } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-basecolor flex justify-between text-white sm:px-2 sm:text-lg font-bold">
      {/* <SearchBox /> */}
      <NavLink to="/">
        <img
          loading="lazy"
          src="https://icms-image.slatic.net/images/ims-web/e6ac6883-1158-4663-bda4-df5a1aa066e5.png"
          alt="app_logo"
          className="h-12 max-md:h-8"
        />
      </NavLink>
      <div className="flex items-center sm:gap-x-4">
        <NavLink to="/cart" className="flex items-center">
          <FaShoppingCart /> Cart
          <p className="text-xs border rounded-full bg-white text-basecolor">
            {total_items}
          </p>
        </NavLink>

        {userInfo ? (
          <ul>
            <Link to="/profile">{userInfo.name}</Link>

            <li
              onClick={logoutHandler}
              className="cursor-pointer border border-white"
            >
              Log Out
            </li>
          </ul>
        ) : (
          <NavLink to="/login" className="flex items-center">
            <FaUser /> Sign In
          </NavLink>
        )}
        {userInfo && userInfo.isAdmin && (
         <div className="flex flex-col bg-red-800">
           <Link to="/admin/orderlist">Orders</Link>
          <Link to="/admin/productlist">Products</Link>
          <Link to="/admin/userlist">Users</Link>
          <Link to="/admin/coupons">Coupons</Link>
         </div>
        )}
      </div>
    </div>
  );
}

export default Header;
