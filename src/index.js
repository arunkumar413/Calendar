import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import App from "./App";
import { CalendarExp } from "./experiment/Calendar";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RecoilRoot>
      {/* <App /> */}
      <CalendarExp />
    </RecoilRoot>
  </StrictMode>
);
