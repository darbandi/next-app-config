// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const webpush = require('web-push');

interface IApiSearchRequest extends NextApiRequest {
  body: string;
}

const publicVapidKey =
  'BGCn5Wqfxpy-vjuxsZNpTVzYlP6JAumy6555PSckJr4xTQcc5ts_RsZ7DqHcmvZzxAbGMa2qQhJRk0BcQ-7nkJc';

const privateVapidKey = 'fc8SXW8geLPTTl_gNoKWAavR-sYQWakRKGwJFrrE18g';

export default function handler(
  req: IApiSearchRequest,
  res: NextApiResponse<{}>
) {
  const body = JSON.parse(req.body);

  if (req.method === 'POST') {
    const payload = JSON.stringify({ title: body.message });

    webpush.setVapidDetails(
      'mailto:test@test.com',
      publicVapidKey,
      privateVapidKey
    );

    webpush
      .sendNotification(body.subscription, payload)
      .catch((err: any) => console.log(err));

    res.status(201).json({});
  } else {
    res.status(400).json({});
  }
}
