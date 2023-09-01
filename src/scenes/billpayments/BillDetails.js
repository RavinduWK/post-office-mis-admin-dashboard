import React from "react";
import { useParams } from "react-router-dom";
import MailForm from "./MailForm";

const BillDetails = () => {
  const { billType } = useParams();

  return (
    <div>
      <h1>{`${billType} Bill Payment`}</h1>
      {/* Rest of your component */}
      <MailForm billType={billType} />
    </div>
  );
};

export default BillDetails;
