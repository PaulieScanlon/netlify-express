import express from 'express';
import serverless from 'serverless-http';

const app = express();
const template =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Index</title></head><body><div id="app"><!--ssr-outlet--></div></body></html>';

const server = async () => {
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const safeUrl = url === '/' ? '/index' : req.originalUrl;

    try {
      const html = template.replace(
        '<!--ssr-outlet-->',
        `<div>
           <strong>url: ${url}</strong>
           <strong>safeUrl: ${safeUrl}</strong>
           <pre>${JSON.stringify({ url: url, safeUrl: safeUrl }, null, 2)}</pre>
        </div>`
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      const html = `<pre>${JSON.stringify(error, null, 2)}</pre>`;
      res.status(500).set({ 'Content-Type': 'text/html' }).end(html);
    }
  });
};

server();

export const handler = serverless(app);
