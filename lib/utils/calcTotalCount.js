export const calcTotalCount = (cart) =>
  cart.reduce((tally, item) => tally + item?.quantity, 0);

export default calcTotalCount;
