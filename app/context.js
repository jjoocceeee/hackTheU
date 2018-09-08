export default (context) => ({
    isAdmin: context.req.user != null ? context.req.user.roles.includes("admin") == true : false,
    user: context.req.user,
    ipAddress: context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress,
    ...context
});
