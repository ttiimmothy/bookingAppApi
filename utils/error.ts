export const createError = (status:any, message:any) => {
	const err = new Error();
	(err as any).status = status;
	err.message = message;
	return err;
}