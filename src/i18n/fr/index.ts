import auth from './auth';
import calendar from './calendar';
import contacts from './contacts';
import dates from './dates';
import general from './general';
import home from './home';
import landing from './landing';
import patients from './patients';
import settings from './settings';
import users from './users';

export default {
  key: 'fr',
  label: 'Français',
  languages: {
    change: 'Changer de langue',
  },
  general,
  landing,
  auth,
  home,
  calendar,
  contacts,
  settings,
  dates,
  patients,
  users,
};
