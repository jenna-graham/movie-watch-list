import { client } from './client';

export async function signUpUser(email, password) {
  const { user } = await client.auth.signUp({ email, password });

  return user;
}

export async function signInUser(email, password) {
  const { user } = await client.auth.signIn({ email, password });

  return user;
}
export function getUser() {
  return client.auth.user();
}
export async function logout() {
  await client.auth.signOut();
}