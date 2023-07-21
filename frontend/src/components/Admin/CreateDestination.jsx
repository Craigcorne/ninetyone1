import React, { useState, useEffect } from "react";

const AddressForm = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [town, setTown] = useState("");
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState("");

  useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountry(selectedCountryId);

    try {
      const response = await fetch(`/api/states/${selectedCountryId}`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateChange = async (event) => {
    const selectedStateId = event.target.value;
    setSelectedState(selectedStateId);

    try {
      const response = await fetch(`/api/towns/${selectedStateId}`);
      const data = await response.json();
      setTowns(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStateCreate = async (event) => {
    event.preventDefault();
    // Form submission logic for creating a state
    // Use the selectedCountry and the state input values
  };

  const handleStateUpdate = async (event) => {
    event.preventDefault();
    // Form submission logic for updating a state
    // Use the selectedState and the updated state input values
  };

  const handleTownCreate = async (event) => {
    event.preventDefault();
    // Form submission logic for creating a town
    // Use the selectedState and the town input values
  };

  const handleTownUpdate = async (event) => {
    event.preventDefault();
    // Form submission logic for updating a town
    // Use the selectedTown and the updated town input values
  };

  const handleStateDelete = async (stateId) => {
    // Logic to delete the state with the given stateId
  };

  const handleTownDelete = async (townId) => {
    // Logic to delete the town with the given townId
  };

  return (
    <div>
      <h2>Address Form</h2>
      <form onSubmit={handleStateCreate}>
        <label>
          Country:
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          State:
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Create State</button>
      </form>
      <br />
      <form onSubmit={handleTownCreate}>
        <label>
          Town:
          <input
            type="text"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Town</button>
      </form>
      <br />
      <h3>States:</h3>
      <ul>
        {states.map((state) => (
          <li key={state._id}>
            {state.name}
            <button onClick={() => handleStateDelete(state._id)}>Delete</button>
            <button onClick={() => handleStateUpdate(state._id)}>Update</button>
          </li>
        ))}
      </ul>
      <h3>Towns:</h3>
      <ul>
        {towns.map((town) => (
          <li key={town._id}>
            {town.name}
            <button onClick={() => handleTownDelete(town._id)}>Delete</button>
            <button onClick={() => handleTownUpdate(town._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressForm;
