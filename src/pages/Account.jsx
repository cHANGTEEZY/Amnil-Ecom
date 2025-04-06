import React, { useContext } from "react";
import AuthContext from "../lib/context/AuthContext";

const AccountPage = () => {
  const { userDetails } = useContext(AuthContext);
  console.log(userDetails);

  return <div></div>;
};

export default AccountPage;
