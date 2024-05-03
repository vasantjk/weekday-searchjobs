import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}></QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
