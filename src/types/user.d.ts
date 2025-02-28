/*
  Add the property of user to the Request Object
*/



declare global {
  export interface Request {
    user?: string;
  }
}