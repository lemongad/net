import { Context } from "netlify:edge";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
};

export default async (request: Request, context: Context) => {
  // 处理CORS预检请求
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: CORS_HEADERS,
    });
  }

  const url = new URL(request.url);
  url.hostname = "hanime1.me";

  const proxyRequest = new Request(url.toString(), {
    body: request.body,
    headers: request.headers,
    method: request.method,
    duplex: 'half', // 设置duplex选项
  });

  const response = await fetch(proxyRequest);

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...CORS_HEADERS, // 添加CORS头
      ...Object.fromEntries(responseHeaders),
    },
  });
};
