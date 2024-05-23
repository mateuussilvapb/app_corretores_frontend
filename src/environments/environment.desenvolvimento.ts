import * as packageJson from '../../package.json';

export const environment = {
  apiUrl: '',
  postLogoutUrl: '',
  baseHref: '',
  keycloak: {
    url: '',
    realm: 'manager',
    clientId: '',
    acceptablePaths: [],
  },
  packageInfo: packageJson,
};
