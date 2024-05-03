import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import SearchJob from './Pages/SearchJob';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SearchJob />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
