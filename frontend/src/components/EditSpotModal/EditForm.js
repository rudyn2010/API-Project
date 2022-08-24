import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { updateASpot } from "../../store/spots";

const EditSpotForm = () => {

    const dispatch = useDispatch();

    const { spotId } = useParams();
    const spots = useSelector((state) => state.spots);
    const spot = spots[spotId];

    const [ address, setAddress ] = useState(spot?.address);
    const [ city, setCity ] = useState(spot?.city);
    const [ state, setState ] = useState(spot?.state);
    const [ country, setCountry ] = useState(spot?.country);
    const [ lat, setLat ] = useState(spot?.lat);
    const [ lng, setLng ] = useState(spot?.lng);
    const [ name, setName ] = useState(spot?.name);
    const [ description, setDescription ] = useState(spot?.description);
    const [ price, setPrice ] = useState(spot?.price);

    //slice for errors
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        let errors = [];
        if (address === "") errors.push('Street address is required');
        if (city === "") errors.push('City is required');
        if (state === "") errors.push('State is required');
        if (country === "") errors.push('Country is required');
        if (lat === "") errors.push('Latitude is not valid');
        if (lng === "") errors.push('Longitude is not valid');
        if (name === "") errors.push('Name is required');
        if (name.length > 50) errors.push('Name must be less than 50 characters');
        if (description === "") errors.push('Description is required');
        if (price === "") errors.push('Price per day is required');
        setErrors(errors);
    }, [ address, city, state, country, lat, lng, name, description, price ]);

    const errorsList = errors.map((error, i) => (
      <li key={i} >{error}</li>
    ))

    const onSubmit = (e) => {
        e.preventDefault();

        const spotData = {
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price
        }

        setErrors([]);
        dispatch(updateASpot({ spotId, spotData }));

    }

    return (
      <form onSubmit={onSubmit}>
        <h2>Edit Your Spot</h2>
        <ul className="errors">
          {errorsList}
        </ul>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            name="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            name="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Price
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button
          type="submit"
          disabled={errors.length > 0}
        >
          Continue
        </button>
      </form>
    );
  }

  export default EditSpotForm;
