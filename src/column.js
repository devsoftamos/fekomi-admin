  
export const COLUMNS = [
    {
        Header: "",
        accessor: "name",
        Cell: (tableProps) => (
          <img src="/boy.svg"   alt="" />
        ),  
      },
  {
    Header: "Name",
    accessor: "name",
    // Cell: (tableProps) => (
    //   <img src={tableProps.row.original.image} className="w-10 h-10" alt="" />
    // ),  
  },
  {
    Header: "Email",
    accessor: "email",  
  },
  {
    Header: " Phone Number",
    accessor: " phone_no",
     
  },
  {
    Header: "Date Of Birth",
    accessor: "dob",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Status",
    accessor: "status",
    // Cell: (tableProps) => (
    //   <div
    //     style={{
    //       textTransform: "capitalize",
    //       color: `${
    //         tableProps.row.original.status == "approved"
    //           ? "#299253"
    //           : tableProps.row.original.status == "unapproved"
    //           ? "#EB5757"
    //           : tableProps.row.original.outOfStock == 1
    //           ? "#FC9E0F"
    //           : "#6A6A6A"
    //       }`,
    //     }}
    //   >
    //     {tableProps.row.original.outOfStock == 1
    //       ? "Out of Stock"
    //       : tableProps.row.original.status}
    //   </div>
    // ),
  },
  {
    Header: "Action",
    accessor: "action",
    
  },
  {
    Header: "",
    accessor: "action",
    
  },
  {
    Header: "",
    accessor: "action",
    
  },
];