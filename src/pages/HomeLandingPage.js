import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";

// components
import LandingPage from "../components/landing-page";

const HomeLandingPage = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>IRIELIVITY</title>
        <meta name="description" content="IRIELIVITY." />
      </MetaTags>
      <div>
        <LandingPage />
      </div>
    </Fragment>
  );
};

export default HomeLandingPage;
