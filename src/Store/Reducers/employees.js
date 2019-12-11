const initialState = {
  employeeId: "employeeId",
  name: "name",
  phone: "phone",
  employeeType: "Thời vụ"
};

const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES_DATA":
      return { ...state, ...action.payload };
    case "DELETE_EMPLOYEES":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default dataUser;
