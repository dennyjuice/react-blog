export const AXIOS_BASE_URL = 'https://conduit.productionready.io/api';

export enum Routes {
  HOME = '/',
  ARTICLES = '/articles',
  ARTICLES_PAGE = '/articles/:page',
  ARTICLE = '/article/:slug',
  EDIT_ARTICLE = '/article/:slug/edit',
  NEW_ARTICLE = '/new-article',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  PROFILE = '/profile',
}

export const EMAIL_VALIDATE_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const IMAGE_URL_VALIDATE_PATTERN = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

export const validationRules = {
  username: {
    required: 'Username is required!',
    validate: {
      less: (value: string) => value.length > 2 || 'Username should be at least 3 characters',
      many: (value: string) => value.length < 19 || 'Too much characters. Needs to be less than 20.',
    },
  },
  email: {
    required: 'Email is required!',
    pattern: {
      value: EMAIL_VALIDATE_PATTERN,
      message: 'Invalid email address!',
    },
  },
  password: {
    required: 'Password is required!',
    validate: {
      less: (value: string) => value.length > 7 || 'Password should be at least 8 characters',
      many: (value: string) => value.length < 39 || 'Too much characters. Needs to be less than 40.',
    },
  },
  image: {
    pattern: {
      value: IMAGE_URL_VALIDATE_PATTERN,
      message: 'Invalid image direct url address!',
    },
  },
  privacy: {
    required: 'Please agree with processing!',
    validate: { checked: (value: boolean) => value || 'Username should be at least 3 characters' },
  },
  title: {
    required: 'Title is required!',
  },
  desription: {
    required: 'Short description is required!',
  },
  textarea: {
    required: 'Write a few words :)',
  },
};
