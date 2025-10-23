import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import app from '../../server/index.js';
import { createServer } from 'http';

let server: any;

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Initialize server only once
  if (!server) {
    server = createServer(app);
  }

  return new Promise((resolve, reject) => {
    const req = {
      ...event,
      method: event.httpMethod,
      url: event.path + (event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''),
      headers: event.headers,
      body: event.body,
    };

    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      end: (data: string) => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      },
      writeHead: (statusCode: number, headers: any) => {
        res.statusCode = statusCode;
        res.headers = { ...res.headers, ...headers };
      },
      setHeader: (name: string, value: string) => {
        res.headers[name] = value;
      },
      write: (data: string) => {
        res.body += data;
      },
    };

    try {
      app(req as any, res as any);
    } catch (error) {
      reject(error);
    }
  });
};