const initialState = {
  id: "info.id",
  name: "info.name",
  sku: "info.sku",
  quantity: "info.quantity",
  price: "info.price",
  description: "info.description"
};

const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCT_DATA":
      return { ...state, ...action.payload };
    case "DELETE_PRODUCT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default dataUser;
