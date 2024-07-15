import { Provider } from "react-redux";
import { Router } from "@/routes";

import { initializeStore } from "@/store";

const store = initializeStore();

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
