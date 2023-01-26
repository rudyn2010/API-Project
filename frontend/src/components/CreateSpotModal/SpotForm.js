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
    const [ isSubmitted, setIsSubmitted ] = useState(false);

    //slice for errors
    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        let errors = [];
        if (name.length > 50) errors.push('Name must be less than 50 characters');
        if (description.length > 255) errors.push('Description must be less than 255 characters');
        if (price.split("").includes(".")) errors.push("Price must be a whole number.");
        if (lat > 90 || lat < -90) errors.push("Latitude must be between -90 and 90.");
        if (lng > 180 || lng < -180) errors.push("Longitude must be between -180 and 180.");
        // if (!imgUrl.endsWith(".jpeg") && !imgUrl.endsWith(".png") && !imgUrl.endsWith(".jpg") && !imgUrl.endsWith(".gif")) errors.push('Valid Img Url is required');
        setErrors(errors);
    }, [ address, city, state, country, lat, lng, name, description, price, imgUrl ]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitted(true);
        // console.log("ERRRORS:", errors)
        if (errors.length) return;

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

        console.log("image data", imgData);

        setErrors([]);
        let newSpot = await dispatch(createASpot(spotData)).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors)
        })

        await dispatch(addImageToSpot(newSpot.id, imgData))

        history.push(`/spots/${newSpot.id}`)
    };

    const updateFile = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImgUrl(file)
      };
    };

    return (
      <div className="create-modal-display">
          <form className="spot-create-form" onSubmit={handleSubmit}>
          <div className="spot-form-header">Create A New Spot</div>
          { isSubmitted && errors.length > 0 && (
            <div className="errors-display">
              {Object.values(errors).map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
          )}
            <input className="modal-input-field"
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="Address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="City"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="State"
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="Country"
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="Price"
              type="number"
              name="price"
              min={0}
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              />
            <input className="modal-input-field overflow-field"
              placeholder="Desciption"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="Latitude"
              type="number"
              name="lat"
              min={-90}
              max={90}
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              />
            <input className="modal-input-field"
              placeholder="Longitude"
              type="number"
              name="lng"
              min={-180}
              max={180}
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              />
            {/* <input className="modal-input-field"
              placeholder=".jpg / .jpeg / .png"
              type="url"
              name="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
              /> */}
            <input className="modal-input-field"
              placeholder="Image"
              type="file"
              name="imgUrl"
              onChange={updateFile}
              />
          <div className="continue-modal-button" onClick={(e) => handleSubmit(e)}>
            Continue
          </div>
        </form>
      </div>
    );
  }

  export default SpotForm;
