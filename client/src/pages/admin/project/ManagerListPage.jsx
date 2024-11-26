import React from "react";
import RoleBasedListPages from "../../../components/admin/reusableComponent/RoleBasedListPages";


const ManagerListPage = () => {
  return <RoleBasedListPages roleFilter="manager" />;
};

export default ManagerListPage;
