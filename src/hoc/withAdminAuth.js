import { useAdminAuth } from "../custom-hooks";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
