import { configureStore } from '@reduxjs/toolkit';

import Jobreducer from './stores/JobSearch';

const store = configureStore({
  reducer: {
    searchJob: Jobreducer,
  },
});

export default store;
