export interface RouteDetails {
  name: string;
  path: string;
}
type RoutesDetailsType = { [key: string]: RouteDetails };
export const RoutesDetails: RoutesDetailsType = {
  landing: {
    name: 'landing',
    path: '/',
  },
  login: {
    name: 'login',
    path: '/login',
  },
  register: {
    name: 'register',
    path: '/register',
  },
  home: {
    name: 'home',
    path: '/app',
  },
  contacts: {
    name: 'contacts',
    path: '/app/contacts',
  },
  calendar: {
    name: 'calendar',
    path: '/app/calendar',
  },
  settings: {
    name: 'settings',
    path: '/app/settings',
  },
  profileSettings: {
    name: 'profileSettings',
    path: '/app/settings',
  },
  applicationSettings: {
    name: 'applicationSettings',
    path: '/app/settings/application',
  },
  companySettings: {
    name: 'companySettings',
    path: '/app/settings/company',
  },
};
