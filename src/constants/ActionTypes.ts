export const INIT_ACTION = 'INIT_ACTION';

/* Auth */
export const ME = 'ME' as const;
export const ME_SUCCESS = 'ME_SUCCESS' as const;
export const ME_FAILURE = 'ME_FAILURE' as const;

export const SIGNIN = 'SIGNIN' as const;
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS' as const;
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE' as const;

export const LOGOUT = 'LOGOUT' as const;
/* Modal */

export const OPEN_MODAL = 'OPEN_MODAL' as const;
export const CLOSE_MODAL = 'CLOSE_MODAL' as const;

/* Question */

export const POST_QUESTION = 'POST_QUESTION' as const;
export const POST_QUESTION_SUCCESS = 'POST_QEUSTION_SUCCESS' as const;
export const POST_QUESTION_FAILURE = 'POST_QUESTION_FAILURE' as const;

export const GET_QUESTIONS = 'GET_QUESTIONS' as const;
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS' as const;
export const GET_QUESTIONS_FAILURE = 'GET_QUESTIONS_FAILURE' as const;

/* Tag */

export const GET_TAGS = 'GET_TAGS' as const;
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS' as const;
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE' as const;
