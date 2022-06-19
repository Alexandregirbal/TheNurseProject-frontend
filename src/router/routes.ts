import { CompanyService } from 'src/api/company.service';
import { RoundService } from 'src/api/round.service';
import { UserService } from 'src/api/user.service';
import LocalStorageKeys from 'src/localStorage/keys';
import { useCompanyStore } from 'src/stores/company/company.store';
import { useRoundStore } from 'src/stores/round/round.store';
import { useUserStore } from 'src/stores/user/user.store';
import { RouteRecordRaw } from 'vue-router';
import { RoutesDetails } from './objects';

const hasUserToken = (): boolean => {
  return !!localStorage.getItem(LocalStorageKeys.token);
};

const ensureUserFetched = async () => {
  const userFetched = await UserService.findMe();
  useUserStore().setMe(userFetched);
};
const getCompany = async () => {
  const firstCompanyId = useUserStore().getMe.companies[0] ?? '';
  const company = await CompanyService.findOne(firstCompanyId);
  useCompanyStore().set(company);
};

const getCompanyRounds = async () => {
  const company = useCompanyStore().get;
  const rounds = await RoundService.getAll(company);
  useRoundStore().set(rounds);
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/LandingLayout.vue'),
    children: [
      {
        ...RoutesDetails.landing,
        component: () => import('pages/landing/landingPage.vue'),
      },
      {
        ...RoutesDetails.login,
        component: () => import('src/pages/authentication/login.vue'),
      },
      {
        ...RoutesDetails.register,
        component: () => import('src/pages/authentication/register.vue'),
      },
    ],
  },
  {
    path: '/app',
    beforeEnter: async (to, from, next) => {
      await ensureUserFetched();

      if (hasUserToken()) {
        await getCompany();
        await getCompanyRounds();
        next();
      } else {
        next({
          name: 'landing',
          query: { message: 'No user token in local storage' },
        });
      }
    },
    component: () => import('src/layouts/AuthenticatedLayout/index.vue'),
    children: [
      {
        ...RoutesDetails.home,
        component: () => import('pages/private/home.vue'),
      },
      {
        ...RoutesDetails.contacts,
        component: () => import('pages/private/contacts.vue'),
      },
      {
        ...RoutesDetails.calendar,
        component: () => import('pages/private/calendar.vue'),
      },
      {
        path: RoutesDetails.settings.path,
        component: () => import('src/pages/private/settings/layout.vue'),
        children: [
          {
            ...RoutesDetails.applicationSettings,
            component: () =>
              import('src/pages/private/settings/applicationSettings.vue'),
          },
          {
            ...RoutesDetails.profileSettings,
            component: () =>
              import('src/pages/private/settings/profileSettings.vue'),
          },
          {
            ...RoutesDetails.companySettings,
            component: () =>
              import('src/pages/private/settings/companySettings.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/errors/Error404.vue'),
  },
];

export default routes;
