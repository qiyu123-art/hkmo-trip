// 单个 HTML 页面的静态托管 Worker。
// 站点只有一张页面，正常请求由 Workers 的静态资源（ASSETS）直接提供。
// 这里只兜底一件事：路径没有扩展名时（如 /day1）统一回落到首页，
// 避免用户手输路径看到 404。
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || !url.pathname.includes(".")) {
      const index = new URL("/index.html", url);
      return env.ASSETS.fetch(new Request(index, request));
    }

    return env.ASSETS.fetch(request);
  },
};
