// import React, { useState } from "react";
// import { useRouter } from "react-router-dom";
// import { Country, State, City } from "../model/location";
// import { axios } from "axios";

// const AdminLocation = () => {
//   const [country, setCountry] = useState("");
//   const [states, setStates] = useState([]);
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [shippingFee, setShippingFee] = useState(0);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const router = useRouter();

//   const handleCountryChange = (event) => {
//     setCountry(event.target.value);
//   };

//   const handleStateChange = (event) => {
//     setStates(states.filter((state) => state.country === event.target.value));
//     setSelectedCountry(event.target.value);
//   };

//   const handleCityChange = (event) => {
//     setCity(event.target.value);
//   };

//   const handleShippingFeeChange = (event) => {
//     setShippingFee(event.target.value);
//   };

//   const handleCreateCountry = async () => {
//     try {
//       const response = await axios.post(`/admin/countries`, {
//         name: country,
//       });
//       console.log("Created Country:", response.data);
//       setCountry("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCreateState = async () => {
//     try {
//       if (!selectedCountry) {
//         return alert("Please select a country first.");
//       }
//       const response = await axios.post(`/admin/states`, {
//         name: state,
//         countryId: selectedCountry,
//       });
//       console.log("Created State:", response.data);
//       setStates(states.concat(response.data));
//       setSelectedCountry(null);
//       setCity("");
//       setShippingFee(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCreateCity = async () => {
//     try {
//       if (!selectedCountry) {
//         return alert("Please select a country first.");
//       } else if (!state) {
//         return alert("Please select a state first.");
//       }
//       const response = await axios.post(`/admin/cities`, {
//         name: city,
//         stateId: state,
//         shippingFee,
//       });
//       console.log("Created City:", response.data);
//       setStates(states.filter((state) => state.country === selectedCountry));
//       setSelectedCountry(null);
//       setCity("");
//       setShippingFee(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Page</h2>
//       <form onSubmit={handleCreateCountry}>
//         <label>
//           Country:
//           <input type="text" value={country} onChange={handleCountryChange} />
//         </label>
//         <button type="submit">Create Country</button>
//       </form>
//       <br />
//       <h3>States</h3>
//       <ul>
//         {states && states.map((state) => <li key={state.id}>{state.name}</li>)}
//       </ul>
//       <br />
//       <form onSubmit={handleCreateState}>
//         <label>
//           State:
//           <input type="text" value={state} onChange={handleStateChange} />
//         </label>
//         <button type="submit">Create State</button>
//       </form>
//       <br />
//       <br />
//       <h3>Cities</h3>
//       <ul>
//         {states &&
//           states.map((state) => {
//             const cities = state.cities;
//             return (
//               <li key={state.id}>
//                 {state.name}
//                 <ul>
//                   {cities &&
//                     cities.map((city) => (
//                       <li key={city.id}>
//                         {city.name} - Shipping Fee: {city.shippingFee}
//                       </li>
//                     ))}
//                 </ul>
//               </li>
//             );
//           })}
//       </ul>
//       <br />
//       <form onSubmit={handleCreateCity}>
//         <label>
//           City:
//           <input type="text" value={city} onChange={handleCityChange} />
//         </label>
//         <br />
//         <label>
//           State:
//           <select value={state} onChange={handleStateChange}>
//             <option value="">Select a state</option>
//             {states &&
//               states.map((state) => (
//                 <option key={state.id} value={state.id}>
//                   {state.name}
//                 </option>
//               ))}
//           </select>
//         </label>
//         <br />
//         <label>
//           Shipping Fee:
//           <input
//             type="number"
//             value={shippingFee}
//             onChange={handleShippingFeeChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Create City</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLocation;
