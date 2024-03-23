import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  url.hostname = "www.cc.com"; // 替换为您要反向代理的目标网站域名

  const proxyRequest = new Request(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });

  const response = await fetch(proxyRequest);

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
};
