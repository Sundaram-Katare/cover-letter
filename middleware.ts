import { withAuth } from "next-auth/middleware";

// only allow access when session/token exists
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// protect this path (adjust if your URL differs)
export const config = {
  matcher: ["/pages/auth/generator/:path*", "/pages/auth/generator"],
};