import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";

// components
import LandingPage from "../components/landing-page";

const HomeLandingPage = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Irielivity Ltd</title>
        <meta name="description" content="Irielivity" />
      </MetaTags>
      <div>
        <LandingPage onFirstLoad={false} />
      </div>
    </Fragment>
  );
};

export default HomeLandingPage;
