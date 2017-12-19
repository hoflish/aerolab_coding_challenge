const PHRASES = {
  check_internet_connection: {
    phrase: 'No Internet connection',
    hint: 'Please check your Internet connection and try again.',
  },
  logged_out: {
    phrase: 'Your are logging out',
    hint: 'You must log in to see the products'
  },
  internal_error: "Oops! Something went wrong. Please try again later.",
  request_timeout: "Request timed out",
  field_empty: "Fields can't be empty",
  retry: "Try again",
  retry_later: "Retry later",
  login: "Login",
  login_redirect: "Redirect to login page",
  missing_credentials: "Don't have credentials?",
};

export default function phrases(prop) {
  if (PHRASES.hasOwnProperty(prop)) {
    return PHRASES[prop];
  }
  return console.error("missing phrase: " + prop) &&  prop;
}

