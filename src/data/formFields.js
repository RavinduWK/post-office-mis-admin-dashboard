export const postOfficeOptions = [
  { label: "Matara", value: 10 },
  { label: "Galle", value: 20 },
  { label: "Colombo", value: 30 },
];

export const fieldsData = {
  senderName: { label: "Sender's Name", id: "sender_name", type: "text" },
  senderDistrict: {
    label: "Sender's District",
    id: "sender_district",
    type: "text",
  },
  senderCity: {
    label: "Sender's City",
    id: "sender_city",
    type: "text",
  },
  senderAddress: {
    label: "Sender's Address",
    id: "sender_address",
    type: "text",
  },
  senderNIC: {
    label: "Sender's NIC",
    id: "sender_nic",
    type: "text",
  },
  recipientName: {
    label: "Recipient's Name",
    id: "recipient_name",
    type: "text",
  },
  recipientDistrict: {
    label: "Recipient's District",
    id: "recipient_district",
    type: "text",
  },
  recipientNIC: {
    label: "Recipient's NIC",
    id: "recipient_nic",
    type: "text",
  },
  recipientCity: {
    label: "Recipient's City",
    id: "recipient_city",
    type: "text",
  },
  recipientAddress: {
    label: "Recipient's Address",
    id: "recipient_address",
    type: "text",
  },
  accountNumber: {
    label: "Account Number",
    id: "account_number",
    type: "text",
  },
  cost: {
    label: "Cost",
    id: "cost",
    type: "text",
  },
  transferAmount: {
    label: "Transfer Amount",
    id: "transfer_amount",
    type: "text",
  },
};

export const billPaymentData = {
  customerName: { label: "Customer's Name", id: "customer_name", type: "text" },
  customerDistrict: {
    label: "Customer's District",
    id: "customer_district",
    type: "text",
  },
  customerCity: {
    label: "Customer's City",
    id: "customer_city",
    type: "text",
  },
  customerAddress: {
    label: "Customer's Address",
    id: "customer_address",
    type: "text",
  },
  billAccountNumber: {
    label: "Bill Account Number",
    id: "bill_account_number",
    type: "text",
  },
  payingAmount: { label: "Paying Amount", id: "paying_amount", type: "text" },
  serviceProvider: {
    label: "Service Provider",
    id: "service_provider",
    type: "formControl",
    options: [],
  },
};

export const postOfficeData = {
  acceptedPostOffice: {
    label: "Accepted PostOffice",
    id: "accepted_post_office",
    type: "formControl",
    options: postOfficeOptions,
  },
  destinationPostOffice: {
    label: "Destination PostOffice",
    id: "destination_post_office",
    type: "formControl",
    options: postOfficeOptions,
  },
};

export const employeeRegisterData = {
  employeeFullName: {
    label: "Employee Full Name",
    id: "employee_full_name",
    type: "text",
  },
  employeeNIC: {
    label: "Employee NIC",
    id: "employee_nic",
    type: "text",
  },
  employeeEmail: {
    label: "Employee Email",
    id: "employee_email",
    type: "text",
  },
  employeeDateOfBirth: {
    label: "Date Of Birth",
    id: "date_of_birth",
    type: "text",
  },
  employeeContactNumber: {
    label: "Employee Contact Number",
    id: "employee_contact_number",
    type: "text",
  },
  accountPassword: {
    label: "Password",
    id: "password",
    type: "text",
  },
  employeeRole: {
    label: "Employee Role",
    id: "employee_role",
    type: "formControl",
    options: [],
  },
};
