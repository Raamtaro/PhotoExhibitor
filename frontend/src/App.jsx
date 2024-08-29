import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import CollectionsViewer from "./Components/User/Collections/CollectionsViewer/CollectionsViewer";

function App() {
  return (
    <>
      <main>
        <CollectionsViewer />
      </main>
      <footer>
        <p>© 2024 Raamtaro Inc. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
