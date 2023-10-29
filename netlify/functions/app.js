import fs from 'fs';
import express from 'express';
import serverless from 'serverless-http';

const app = express();

const server = async () => {
  let template;

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const safeUrl = url === '/' ? '/index' : req.originalUrl;

    try {
      template = fs.readFileSync('./public/index.html', 'utf-8');

      const html = template.replace(
        '<!--ssr-outlet-->',
        `<pre>${JSON.stringify({ url: url, safeUrl: safeUrl }, null, 2)}</pre>`
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
