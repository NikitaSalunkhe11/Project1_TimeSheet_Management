import React from "react";
import RoleBasedListPages from "../../../components/admin/reusableComponent/RoleBasedListPages";


const EmployeeListPage = () => {
  return <RoleBasedListPages roleFilter="employee" />;
};

export default EmployeeListPage;
