import fs from 'fs';
import path from 'path';
import express from 'express';
import serverless from 'serverless-http';
import compression from 'compression';
import serve from 'serve-static';

const app = express();

import { render } from './server/entry-server';

const exists = (file) => {
  return fs.existsSync(file);
};

const server = async () => {
  let template, serverFile, serverFunction, serverData;

  app.use(compression());
  app.use(serve(`${__dirname}/client`, { index: false }));

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const safeUrl = url === '/' ? '/index' : req.originalUrl;

    try {
      template = fs.readFileSync(`${__dirname}/client/index.html`, 'utf-8');
      serverFile = path.resolve(`${__dirname}/functions${safeUrl}/function.cjs`);

      console.log('serverFile: ', serverFile);

      if (exists(serverFile)) {
        serverFunction = await require(serverFile).GET;
        serverData = await serverFunction();
      }

      const dom = render(url, serverData);

      const script = `<script>window.__data__=${JSON.stringify(serverData)}</script>`;
      const html = template.replace(`<!--ssr-outlet-->`, `${dom} ${script}`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      console.log('///// error');
      console.log(error);
      const html = `<pre>${JSON.stringify(error, null, 2)}</pre>`;
      res.status(500).set({ 'Content-Type': 'text/html' }).end(html);
    }
  });
};

server();

export const handler = serverless(app);

// const resolve = (file) => {
//   return process.env.LAMBDA_TASK_ROOT
//     ? path.resolve(process.env.LAMBDA_TASK_ROOT, file)
//     : path.resolve(__dirname, file);
// };

// let dir = fs.readdir(`${__dirname}/server`, (err, files) => {
//   if (err) console.log(err);
//   else {
//     console.log('\nCurrent directory filenames:');
//     files.forEach((file) => {
//       console.log(file);
//     });
//   }
// });
