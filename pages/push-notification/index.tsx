import { useContext, useState } from 'react';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import GlobalContext, {
  IGlobalContext,
} from '../../state/global/GlobalContext';
import { NextPageWithLayout } from '../page';

export interface IPushNotification {}

const PushNotification: NextPageWithLayout<IPushNotification> = () => {
  const { subscription } = useContext<IGlobalContext>(GlobalContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription,
        message,
      }),
      headers: {
        'component-type': 'application/json',
      },
    });
  };

  return (
    <>
      <form className="mt-8 space-y-6 w-128" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={3}
                className="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="text ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Write your message and send it.
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Push Notification
          </button>
        </div>
      </form>
    </>
  );
};

export default PushNotification;

PushNotification.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
