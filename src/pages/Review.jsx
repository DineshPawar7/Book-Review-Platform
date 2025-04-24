const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          &#9733;
        </span>
      );
    }
    return stars;
  };
  
  export default function Review({ reviews }) {
    return (
      <div>
        <h3 className="text-xl font-semibold">Reviews:</h3>
        <ul className="mt-4 space-y-4">
          {reviews.map((rev, index) => (
            <li key={rev._id || index} className="p-4 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-700 font-semibold">{rev.user?.username || "Dinesh"}</p> 
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(rev.rating)}
                <span className="text-sm text-gray-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
              </div>
              
  
              <p>{rev.review}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  