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
        if (description.length > 255) errors.push('Description must be less than 255 characters');
        if (name.length > 50) errors.push('Name must be less than 50 characters');
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
      <div className="edit-modal-display">
        <form className="edit-modal-form" onSubmit={onSubmit}>
          <div className="edit-form-header">Edit Your Spot</div>
          <ul className="errors">
            {errorsList}
          </ul>
            <input className="modal-input-field"
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            <input className="modal-input-field"
              placeholder="Address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
            <input className="modal-input-field"
              placeholder="City"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              />
            <input className="modal-input-field"
              placeholder="State"
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              />
            <input className="modal-input-field"
              placeholder="Country"
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              />
            <input className="modal-input-field"
                placeholder="Price"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
            <input className="modal-input-field"
                placeholder="Description"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            <input className="modal-input-field"
              placeholder="Latitude"
              type="number"
              name="lat"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              />
            <input className="modal-input-field"
              placeholder="Longitude"
              type="number"
              name="lng"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              />
          <button
            className="edit-cont-button"
            type="submit"
            disabled={errors.length > 0}
            >
            Continue
          </button>
        </form>
      </div>
    );
  }

  export default EditSpotForm;
