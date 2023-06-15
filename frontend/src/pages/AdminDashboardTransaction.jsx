import React, { useEffect, useState } from "react";
// import { server } from "../server";
// import axios from "axios";
import AdminHeader from "../components/Layout/AdminHeader";
import { DataGrid } from "@material-ui/data-grid";
import AdminSideBar from "../components/Admin/Layout/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMpesaTransactions } from "../redux/actions/order";

// function AdminDashboardTransaction() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${server}/mpesa/transactions`)
//       .then((data) => {
//         setTransactions(data.data);
//         // console.log(transactions);
//       })
//       .catch((err) => console.log(err.message));
//   }, []);

//   return (
//     <div className="col-12 col-md-7 pt-5 mb-5 ">
//       <div className="promo pe-md-3 pe-lg-5">
//         <h1 className="headline mb-3" style={{ textAlign: "center" }}>
//           TRANSACTION LIST
//         </h1>
//         <div className="cta-holder row gx-md-3 gy-3 gy-md-0">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">Date</th>
//                 <th scope="col">Amount</th>
//                 <th scope="col">Phone</th>
//                 <th scope="col">TrnxID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.length < 1 ? (
//                 <tr>
//                   <td className="text-center" colSpan={6}>
//                     No Record Found
//                   </td>
//                 </tr>
//               ) : (
//                 transactions.map((transaction) => (
//                   <tr key={transaction._id}>
//                     <td>{new Date(transaction.createdAt).toDateString()}</td>
//                     <td>{transaction.amount}</td>
//                     <td>
//                       {transaction.customer_number.substring(0, 4)}xxxx
//                       {transaction.customer_number.slice(-2)}
//                     </td>
//                     <td>{transaction.mpesa_ref}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/*//cta-holder*/}
//       </div>
//     </div>
//   );
// }
// export default AdminDashboardTransaction;
const AdminDashboardTransaction = () => {
  const dispatch = useDispatch();

  const { adminTransactions, adminTransactionsLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllMpesaTransactions());
  }, []);

  const columns = [
    { field: "id", headerName: "Transaction ID", minWidth: 180, flex: 0.9 },

    {
      field: "Phone",
      headerName: "Phone Number",
      minWidth: 180,
      flex: 1,
    },

    {
      field: "Amount",
      headerName: "Amount",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Date",
      headerName: "Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminTransactions &&
    adminTransactions.forEach((item) => {
      row.push({
        id: item.mpesa_ref,
        Phone: item.customer_number,
        Amount: item.amount,
        Date: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={8} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTransaction;
