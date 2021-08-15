import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect, useDispatch } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// utils
import { setCurrentUser } from "./redux/reducers/user/userActions";
import { auth, handleUserProfile } from "./firebase/utils";

// hoc for auth handling
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

/*** PAGES **/
const Loader = lazy(() => import("./pages/Loader"));
const Home = lazy(() => import("./pages/Home"));
const MembersSettings = lazy(() => import("./pages/MembersSettings"));
const ShopCategories = lazy(() => import("./pages/ShopCategories"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Media = lazy(() => import("./pages/Media"));

/**ADMIN PAGES **/
const AdminHome = lazy(() => import("./pages/admin/Home"));
const AdminAddProduct = lazy(() => import("./pages/admin/AddProduct"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers"));
const AdminAccount = lazy(() => import("./pages/admin/Account"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AdminReceipts = lazy(() => import("./pages/admin/Receipts"));

/*** END PAGES **/

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  // auth listener
  useEffect(() => {
    // tracks state of component mounted
    let mounted = true;
    // auth observer
    auth.onAuthStateChanged(async (userAuth) => {
      // if component is mounted
      if (mounted) {
        // if no auth user was found
        // return & set state to null
        if (!userAuth) {
          dispatch(setCurrentUser(null));
          return;
        }

        // else set state to user auth
        // and data returned from db
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(setCurrentUser({ userAuth, ...snapshot.data() }));
        });
      }
    });
    // // clean up fxn
    return () => (mounted = !mounted);
  }, [dispatch]);

  return (
    <BreadcrumbsProvider>
      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Switch>
              {/* Customer Pages  */}
              <Route
                exact
                path={process.env.PUBLIC_URL + "/"}
                component={Loader}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/home"}
                component={Home}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/shop"}
                component={Shop}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop/:filterType"}
                component={Shop}
              />

              <Route
                path={process.env.PUBLIC_URL + "/categories"}
                component={ShopCategories}
              />
              <Route
                path={process.env.PUBLIC_URL + "/media"}
                component={Media}
              />

              <Route
                exact
                path={process.env.PUBLIC_URL + "/product"}
                component={ProductDetails}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/product/:productID"}
                component={ProductDetails}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                component={CheckOut}
              />
              <Route
                path={process.env.PUBLIC_URL + "/members"}
                render={(routeProps) => (
                  <WithAuth>
                    <MembersSettings />
                  </WithAuth>
                )}
              />

              {/* Admin Pages */}
              <Route
                path={process.env.PUBLIC_URL + "/admin/home"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminHome />
                  </WithAdminAuth>
                )}
              />

              <Route
                exact
                path={process.env.PUBLIC_URL + "/admin/add-product"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminAddProduct {...routeProps} />
                  </WithAdminAuth>
                )}
              />

              <Route
                path={process.env.PUBLIC_URL + "/admin/add-product/:productID"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminAddProduct {...routeProps} />
                  </WithAdminAuth>
                )}
              />

              <Route
                path={process.env.PUBLIC_URL + "/admin/products"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminProducts />
                  </WithAdminAuth>
                )}
              />

              <Route
                path={process.env.PUBLIC_URL + "/admin/customers"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminCustomers />
                  </WithAdminAuth>
                )}
              />
              <Route
                path={process.env.PUBLIC_URL + "/admin/account"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminAccount />
                  </WithAdminAuth>
                )}
              />
              <Route
                path={process.env.PUBLIC_URL + "/admin/orders"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminOrders />
                  </WithAdminAuth>
                )}
              />
              <Route
                path={process.env.PUBLIC_URL + "/admin/receipts"}
                render={(routeProps) => (
                  <WithAdminAuth>
                    <AdminReceipts />
                  </WithAdminAuth>
                )}
              />
              {/* End Admin Pages */}

              <Route
                path={process.env.PUBLIC_URL + "/not-found"}
                component={NotFound}
              />

              <Route exact component={NotFound} />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Router>
    </BreadcrumbsProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
