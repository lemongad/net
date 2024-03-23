import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  url.hostname = "coze-bot.hf.space";

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
