/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `` | `/` | `/(tabs)` | `/_sitemap` | `/modal` | `/navigation/CommunityStack` | `/screens/AddPost` | `/screens/Buy` | `/screens/Community` | `/screens/Contribute` | `/screens/Home` | `/screens/Learn` | `/screens/Login` | `/screens/Missions` | `/screens/MyProfile` | `/screens/NotFound` | `/screens/Post` | `/screens/posts` | `/two`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
