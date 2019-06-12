export const INIT_ACTION = 'INIT_ACTION';

/* Auth */
export const ME = 'ME' as const;
export const ME_SUCCESS = 'ME_SUCCESS' as const;
export const ME_FAILURE = 'ME_FAILURE' as const;

export const SIGNIN = 'SIGNIN' as const;
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS' as const;
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE' as const;

export const SET_USER_PROFILE = 'SET_USER_PROFILE' as const;
export const SET_WATCHED_TAGS = 'SET_WATCHED_TAGS' as const;

export const LOGOUT = 'LOGOUT' as const;

/* User */
export const LOAD_USER = 'LOAD_USER' as const;
export const GET_USER = 'GET_USER' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILURE = 'GET_USER_FAILURE' as const;

export const LOAD_USER_QUESTIONS = 'LOAD_USER_QUESTIONS' as const;
export const GET_USER_QUESTIONS = 'GET_USER_QUESTIONS' as const;
export const GET_USER_QUESTIONS_SUCCESS = 'GET_USER_QUESTIONS_SUCCESS' as const;
export const GET_USER_QUESTIONS_FAILURE = 'GET_USER_QUESTIONS_FAILURE' as const;

export const LOAD_USER_COMMENTS = 'LOAD_USER_COMMENTS' as const;
export const GET_USER_COMMENTS = 'GET_USER_COMMENTS' as const;
export const GET_USER_COMMENTS_SUCCESS = 'GET_USER_COMMENTS_SUCCESS' as const;
export const GET_USER_COMMENTS_FAILURE = 'GET_USER_COMMENTS_FAILURE' as const;

/* Modal */

export const OPEN_MODAL = 'OPEN_MODAL' as const;
export const CLOSE_MODAL = 'CLOSE_MODAL' as const;

/* Question */

export const POST_QUESTION = 'POST_QUESTION' as const;
export const POST_QUESTION_SUCCESS = 'POST_QEUSTION_SUCCESS' as const;
export const POST_QUESTION_FAILURE = 'POST_QUESTION_FAILURE' as const;

export const GET_QUESTION = 'GET_QUESTION' as const;
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS' as const;
export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE' as const;

export const GET_QUESTIONS = 'GET_QUESTIONS' as const;
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS' as const;
export const GET_QUESTIONS_FAILURE = 'GET_QUESTIONS_FAILURE' as const;

export const UPDATE_QUESTION = 'UPDATE_QUESTION' as const;

export const UPDATE_LIST_QUERY = 'UPDATE_LIST_QUERY' as const;
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY' as const;
export const SET_QUESTION_SEARCH_MODE = 'SET_QUESTION_SEARCH_MODE' as const;
export const LOAD_SEARCHED_QUESTIONS = 'LOAD_SEARCHED_QUESTIONS' as const;
export const LOAD_TAGGED_QUESTIONS = 'LOAD_TAGGED_QUESTIONS' as const;
export const SEARCH_QUESTIONS = 'SEARCH_QUESTIONS' as const;
export const SEARCH_QUESTIONS_SUCCESS = 'SEARCH_QUESTIONS_SUCCESS' as const;
export const SEARCH_QUESTIONS_FAILURE = 'SEARCH_QUESTIONS_FAILURE' as const;

/* Comment */

export const ADD_COMMENT = 'ADD_COMMENT' as const;
export const UPDATE_COMMENT = 'UPDATE_COMMENT' as const;

/* Tag */

export const GET_TAGS = 'GET_TAGS' as const;
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS' as const;
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE' as const;
