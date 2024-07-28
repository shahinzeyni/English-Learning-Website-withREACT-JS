import {createContext} from "react";

const isShowToggleContext = createContext({
    isSidebarShow:false,
    sidebarBtn: () => {}
})
export default isShowToggleContext;