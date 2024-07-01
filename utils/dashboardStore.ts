import { createHook, createStore, defaultRegistry } from 'react-sweet-state';

const DashboardStore = createStore({
  initialState: {
    lastFetchTime: new Date(0),
  },
  actions: {
    updateLastFetchTime:
      () =>
      ({ setState }) => {
        setState({
          lastFetchTime: new Date(),
        });
      },
  },
  name: 'dashboard',
});

export const DashboardStoreRegistry = defaultRegistry.getStore(DashboardStore);

export const useDashboard = createHook(DashboardStore);
