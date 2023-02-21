import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";
import { Storage } from "../utils/storage";
import router from "../router";

const AUTHORITY = import.meta.env.VITE_AUTHORITY;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

let userManager: UserManager | null = null;

export async function init() {
  userManager = new UserManager({
    authority: AUTHORITY,
    client_id: CLIENT_ID,
    scope: "openid email profile offline_access",
    response_type: "code",
    response_mode: "query",
    includeIdTokenInSilentRenew: true,
    redirect_uri: `${location.origin}/signed-in`,
    metadataSeed: {
      // end_session_endpoint: `${AUTHORITY}/v2/logout?client_id=${CLIENT_ID}&returnTo=${location.origin}/signed-out`, // auth0 hack
    },
    userStore: new WebStorageStateStore({ store: localStorage }),
  });
}

export async function login() {
  if (!userManager) await init();
  Storage.set<string>("redirect", location.pathname + location.search);
  await userManager?.signinRedirect();
}

export async function loginCallback() {
  if (!userManager) await init();
  const user = (await userManager?.signinRedirectCallback()) ?? null;

  if (user) {
    const redirect = Storage.pop<string>("redirect");
    if (redirect) router.push(redirect);
    else router.push("/");
  } else {
    throw new Error("cant get author/oidc");
  }
}

export async function logout() {
  if (!userManager) await init();

  try {
    await userManager?.signoutRedirect();
  } catch (e) {
    // catch `em all
    console.error("Logout error", e);
  }
}

export async function logoutCallback() {
  if (!userManager) await init();
  await userManager?.signoutRedirectCallback(location.href);
}

export async function getUser(): Promise<User | null> {
  if (!userManager) await init();
  const user = await userManager?.getUser();

  if (!user || user.expired) return null;
  return user;
}

export function hasUserManagerSet() {
  return !!userManager;
}

export async function getUserHeaders(): Promise<Record<string, string>> {
  const user = await getUser();

  if (!user) return {};
  return { "Author-Authorization": `Bearer ${user.access_token}` };
}
