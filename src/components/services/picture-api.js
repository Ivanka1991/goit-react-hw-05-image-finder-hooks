const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "21938669-8165db93b483567670733df94";

function fetchPicture(requestKey, page) {
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${requestKey}&page=${page}&per_page=12&key=${API_KEY}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("No response from server"));
  });
}
const api = { fetchPicture };

export default api;
