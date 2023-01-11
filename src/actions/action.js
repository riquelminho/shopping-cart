export const addToCart = (product) => {
  return {
      type: "ADDTOCART",
      payload: product
  }
}
export const removeOne = (product) => {
  return {
      type: "REMOVEONE",
      payload: product
  }
}
export const deleteProduct = (product) => {
  return {
      type: "DELETE",
      payload: product
  }
}



export default addToCart;