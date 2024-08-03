/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `` | `/` | `/(tabs)` | `/_sitemap` | `/modal` | `/screens/Buy` | `/screens/Community` | `/screens/Contribute` | `/screens/Home` | `/screens/Learn` | `/screens/Login` | `/screens/Missions` | `/screens/MyProfile` | `/screens/NotFound` | `/two`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
