import { useAuth } from "../custom-hooks";

const WithAuth = (props) => useAuth(props) && props.children;

export default WithAuth;
