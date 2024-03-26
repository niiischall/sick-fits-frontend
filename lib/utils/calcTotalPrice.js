export const calcTotalPrice = (cart) =>
  cart.reduce((tally, item) => {
    if (!item) return tally;
    return tally + item?.quantity * item?.product?.price;
  }, 0);

export default calcTotalPrice;
