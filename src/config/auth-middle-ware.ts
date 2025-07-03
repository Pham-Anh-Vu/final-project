import { logout } from '../shared/reducers/authSlice';

export const errorMiddleware = (store) => (next) => (action) => {
  if (action?.error?.status === 401) {
    store.dispatch(logout());
  }
  return next(action);
};