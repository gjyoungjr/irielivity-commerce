import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

// components
import ProductReview from "./ProductReviews";
// import ProductAdditonalInfo from "./ProductAdditonalInfo";

const ProductDescriptionTab = ({
  spaceBottomClass,
  product,
  productReviews,
}) => {
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productReviews">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                {/* <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link> */}
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews({productReviews ? productReviews.length : 0})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              {/* <Tab.Pane eventKey="additionalInfo">
                <ProductAdditonalInfo
                  dimensions={product.dimensions}
                  materials={product.materials}
                  color={product.colors}
                />
              </Tab.Pane> */}
              {/* <Tab.Pane eventKey="productDescription">lorem ipsum</Tab.Pane> */}
              <Tab.Pane eventKey="productReviews">
                <ProductReview
                  product={product}
                  productReviews={productReviews}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
