import { FriendlyError } from "./FriendlyError";

const PageNotExist = ()=><FriendlyError
message="Page does not exist 404"
link="/"
linkText="return to Home page"
>

</FriendlyError>
export default PageNotExist;