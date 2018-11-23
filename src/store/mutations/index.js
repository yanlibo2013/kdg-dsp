import login from "./login/index"
import home from "./home/index"

import mutations from "./mutations"
import _ from "lodash";

export default _.assign(login,mutations,home);
