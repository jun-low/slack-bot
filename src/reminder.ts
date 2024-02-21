import { type Handler, schedule } from '@netlify/functions';
import { getNewItems } from './util/notion';
import { blocks, slackApi, CHANNELID } from './util/slack';

const postNewNotionItemsToSlack: Handler = async () => {
	const items = await getNewItems();

	await slackApi('chat.postMessage', {
		channel: CHANNELID,
		blocks: [
			blocks.section({
				text: [
					'Here are the opinions awaiting judgment:',
					'',
					...items.map(
						(item) => `- ${item.opinion} (spice level: ${item.spiceLevel})`,
					),
					'',
					`See all items <https://notion.com/${process.env.NOTION_DATABASE_ID}|in Notion>.`,
				].join('\n'),
			}),
		],
	});

	return {
		statusCode: 200,
	};
};

// see https://crontab.guru for scheduling syntax
export const handler = schedule('0 12 * * 1', postNewNotionItemsToSlack);