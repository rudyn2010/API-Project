

const SpotCard = ({ spot }) => {

    console.log(spot)

    return (
        <div className="spot-card-container">
            <div className="spot-card-img-container">
                <img className="spot-card-img" src={spot?.previewImage} alt="Img Not Found" />
            </div>
            <div className="location-star-bar">
                <div className="location">{spot?.city}, {spot?.state}</div>
                <div className="star-sharp">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
            <div className="price-per-night">
                <div className="spot-price">{spot?.price}</div>
                <div className="night-text">night</div>
            </div>
        </div>
    )
}

export default SpotCard;
