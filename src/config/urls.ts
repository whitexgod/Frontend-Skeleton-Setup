import { UrlRouteType } from "../enums/enums";

export const URLS = {
  login: `${UrlRouteType.ADMIN}/login`,
  verify: `${UrlRouteType.ADMIN}/verify-token`,
  refreshToken: `${UrlRouteType.ADMIN}/refresh-token`,
};
