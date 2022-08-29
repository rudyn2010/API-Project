import "./SpotCard.css"

const SpotCard = ({ spot }) => {

    return (
        <div className="spot-card-container">
            <div className="spot-card-img-container">
                <img className="spot-card-img" src={spot?.previewImage || "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} alt="Img Not Found" />
            </div>
            <div className="location-star-bar">
                <div className="location">{spot?.city}, {spot?.state}</div>
                <div className="star-rating-display">
                    <div className="star-sharp"><i className="fa-solid fa-star"></i></div>
                    <div className="avg-review-rating">{spot?.avgRating}</div>
                </div>
            </div>
            <div className="price-per-night">
                <div className="spot-price">${spot?.price}</div>
                <div className="night-text">night</div>
            </div>
        </div>
    )
};

export default SpotCard;
