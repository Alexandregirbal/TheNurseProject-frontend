import { useRouter } from 'vue-router';
import { RouteDetails, RoutesDetails } from './objects';

export const currentRouteIncludes = (routeDetails: RouteDetails): boolean => {
  const { currentRoute } = useRouter();

  return !!currentRoute.value.name
    ?.toString()
    .toLowerCase()
    .includes(routeDetails.name.toLowerCase());
};

export const getTranslationFromRouteName = (
  routeName: string,
  keys: string
): string => {
  let prefix: string;
  if (routeName.toLowerCase().includes(RoutesDetails.settings.name)) {
    prefix = RoutesDetails.settings.name;
  } else {
    prefix = routeName.toLowerCase();
  }
  return `${prefix}.${keys}`;
};
