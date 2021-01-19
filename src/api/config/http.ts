import repository from './repository';
import { ApiEndpoints } from '~/plugins.types';

// endpoints
import AuthApi from '../repositories/auth.api';
import FetchApi from '../repositories/fetch.api'

const http: ApiEndpoints = {
  auth: AuthApi(repository),
  fetchAPI: FetchApi(repository)
};

export default http;
