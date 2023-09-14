export const mailAssignmentData = () => {
  const data = `14851,5/4,Kamal lane,Galle road, Matara
    15874,100/5,Gaan lane,Akuressa road, Matara
    18975,11/8,Tarum lane,Old Tangalle road, Matara
    18754,45/1,Guhif lane,Tangalle Road, Matara
    12454,44/2,Saman lane,Beach Road, Matara`;

  return data.split("\n").map((line) => {
    const [pid, addressNo, street1, street2, city] = line.split(",");
    return {
      pid,
      addressNo,
      street1,
      street2,
      city,
    };
  });
};
