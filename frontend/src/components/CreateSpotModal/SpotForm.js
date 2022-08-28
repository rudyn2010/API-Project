import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { addImageToSpot, createASpot } from "../../store/spots";
import "./CreateSpotModal.css"

const SpotForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ lat, setLat ] = useState("");
    const [ lng, setLng ] = useState("");
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ imgUrl, setImgUrl ] = useState("");

    //slice for errors
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        let errors = [];
        if (description.length > 255) errors.push('Description must be less than 255 characters');
        if (name.length > 50) errors.push('Name must be less than 50 characters');
        if (!imgUrl.endsWith(".jpeg") && !imgUrl.endsWith(".png") && !imgUrl.endsWith(".jpg") && !imgUrl.endsWith(".gif")) errors.push('Valid Img Url is required');
        setErrors(errors);
    }, [ address, city, state, country, lat, lng, name, description, price, imgUrl ]);

    const errorsList = errors.map((error, i) => (
      <li key={i} >{error}</li>
    ))

    const onSubmit = async (e) => {
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

        const imgData = {
          previewImage: true,
          url: imgUrl
        }

        setErrors([]);
        let newSpot = await dispatch(createASpot(spotData))

        await dispatch(addImageToSpot(newSpot.id, imgData))

        history.push(`/spots/${newSpot.id}`)

    }

    return (
      <form className="spot-create-form" onSubmit={onSubmit}>
        <h2>Create A New Spot</h2>
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
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            name="lat"
            min={-90}
            max={90}
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            name="lng"
            min={-180}
            max={180}
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Preview Image
          <input
            type="url"
            name="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
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

  export default SpotForm;
