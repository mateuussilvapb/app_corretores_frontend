import * as packageJson from '../../package.json';

export const environment = {
  apiUrl: 'http://localhost:8081',
  postLogoutUrl: '',
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'manager',
    clientId: 'app_segundo',
    acceptablePaths: ['/public'],
  },
  packageInfo: packageJson,
};
