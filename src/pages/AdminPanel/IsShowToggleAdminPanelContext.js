import { createContext } from "react";

const IsShowToggleAdminPanelContext = createContext({
  isSidebarAdminShow: false,
  setIsSidebarAdminShow: () => {}
});
export default IsShowToggleAdminPanelContext;
