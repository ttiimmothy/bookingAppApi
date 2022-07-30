// need to export sth to eliminate the error when declare global

export interface User{
	id?:string,
	username:string,
	email:string,
	password:string,
	isAdmin?:boolean,
	created_at?:Date,
	updated_at?:Date,
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
