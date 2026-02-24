import { NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  'https://api.databitsid.tech';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
]);

function buildTargetUrl(request, pathSegments) {
  const base = API_BASE_URL.replace(/\/$/, '');
  const path = (pathSegments || []).join('/');
  const url = new URL(`${base}/${path}`);
  const { searchParams } = new URL(request.url);
  searchParams.forEach((value, key) => url.searchParams.append(key, value));
  return url;
}

function filterHeaders(headers) {
  const filtered = new Headers();
  headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      filtered.set(key, value);
    }
  });
  return filtered;
}

async function proxyRequest(request, context) {
  const targetUrl = buildTargetUrl(request, context.params.path);
  const method = request.method.toUpperCase();
  const headers = filterHeaders(request.headers);

  const init = {
    method,
    headers,
    cache: 'no-store',
  };

  if (method !== 'GET' && method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(targetUrl, init);
  const responseHeaders = filterHeaders(response.headers);
  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
