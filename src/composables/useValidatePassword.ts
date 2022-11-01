export default (password: string) => /^(?=.*?[A-Z])?(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm.test(password);
