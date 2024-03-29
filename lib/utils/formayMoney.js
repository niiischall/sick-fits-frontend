const formatMoney = (amount = 0) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // check if its clean dollar
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-US', amount, options);
  return `$${formatter.format(amount / 100)}`;
};

export default formatMoney;
