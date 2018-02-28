import { history } from '../store/configureStore';

export function navigateTo(pathname, query) {
  history.push({ pathname, query });
}
