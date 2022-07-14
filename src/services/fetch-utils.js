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
export async function searchMovies(title) {
  const raw = await fetch(`/.netlify/functions/movies?title=${title}`);
  const { results } = await raw.json();

  return results;
}
export async function createFavorite(favorite) {
  const { body } = await client.from('favorites').insert(favorite);

  return body;
}
export async function getFavorites(id) {
  if (id) {
    const { body } = await client.from('favorites').select('*').match({ user_id: id });
    return body;
  } else {
    const { body } = await client.from('favorites').select('*').match({ user_id: getUser().id });
    return body;
  }
}

export async function deleteFavorite(id) {
  const { body } = await client.from('favorites').delete().match({ id }).single();

  return body;
}

export async function getMovie(id) {
  console.log(id);
  const raw = await fetch(`/.netlify/functions/single-movie?id=${id}`);
  const results = await raw.json();
  return results;
}
