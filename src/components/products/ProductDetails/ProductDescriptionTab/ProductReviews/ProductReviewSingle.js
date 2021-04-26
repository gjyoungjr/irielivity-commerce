import React from "react";
import { Avatar } from "@material-ui/core";

// components
import { Rating } from "../../../../ratings";

// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value = new Date(dateInMillis).toDateString();

  return value;
};

export default function ProductReviewSingle({ review }) {
  // gets user full name
  const fullName = review.user.fullName;
  // gets user initials
  const name = review.user.fullName;
  const initials = name ? name.charAt(0) : "";
  // gets user profile pic
  const avatarUrl = review.user.avatarUrl;

  return (
    <div className="review-wrapper">
      <div className="single-review">
        <div className="review-img">
          {avatarUrl ? (
            <Avatar src={avatarUrl} style={styles.avatar} />
          ) : (
            <Avatar style={styles.avatar}>{initials}</Avatar>
          )}
        </div>
        <div className="review-content">
          <div className="review-top-wrap">
            <div className="review-left">
              <div className="review-name">
                <h4>{fullName}</h4>
              </div>
              <div className="review-rating">
                {review.rating ? <Rating value={review.rating || 0} /> : ""}
              </div>
            </div>
            <div className="review-left" style={styles.dateWrapper}>
              {formatDate(review.createdAt)}
            </div>
          </div>
          <div className="review-bottom">
            <p className="font-weight-bold mb-1">{review.subject}</p>
            <p>{review.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dateWrapper: {
    marginTop: "-8px",
    paddingLeft: "20px",
    opacity: 0.5,
  },
  avatar: {
    height: 70,
    width: 70,
  },
};
