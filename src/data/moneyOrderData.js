export const moneyOrderData = () => {
  const data = `1,101,John Doe,1234,1000
  2,102,Jane Doe,5678,2000
  3,103,Emily Smith,9101,1500
  4,104,Michael Johnson,1121,2500
  5,105,William Brown,3141,3000`;

  return data.split("\n").map((line) => {
    const [pid, recipientId, recipientName, securityCode, amount] =
      line.split(",");
    return {
      pid,
      recipientId,
      recipientName,
      securityCode,
      amount,
    };
  });
};
