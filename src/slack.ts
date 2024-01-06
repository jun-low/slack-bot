import type { Handler } from '@netlify/functions';
import { parse } from 'querystring';
import { blocks, modal, slackApi, verifySlackRequest } from './util/slack';

async function handleSlashCommand(payload: SlackSlashCommandPayload) {
	switch (payload.command) {
		case '/cleo':
			const response = await slackApi('views.open',
				modal({
					id: 'cleo-modal',
					title: 'Start cleo!',
					trigger_id: payload.trigger_id,
					blocks: [
						blocks.section({
							text: 'The discourse demands food drama! *Send in your spiciest food takes so we can all argue about them and feel alive.*',
						}),
						blocks.input({
							id: 'opinion',
							label: 'Send your controversial food opinions here.',
							placeholder: 'Example: peanut butter and mayonnaise sandwiches are delicious!',
							initial_value: payload.text ?? '',
							hint: 'What do you believe about food that people find appalling? Say it with your chest!',
						}),
						blocks.select({
							id: 'spice_level',
							label: 'How spicy is this opinion?',
							placeholder: 'Select a spice level',
							options: [
								{ label: 'mild', value: 'mild' },
								{ label: 'medium', value: 'medium' },
								{ label: 'spicy', value: 'spicy' },
								{ label: 'nuclear', value: 'nuclear' },
							],
						}),
					],
				}),
			);

			if (!response.ok) {
				console.error(`Error opening modal: ${response.error}`);
				return {
					statusCode: 500,
					body: 'Error opening modal',
				};
			}

			break;

		default:
			return {
				statusCode: 200,
				body: `Command ${payload.command} is not recognized`,
			};
	}

	return {
		statusCode: 200,
		body: '',
	};
}

export const handler: Handler = async (event) => {
	const valid = verifySlackRequest(event);
	if (!valid) {
		return {
			statusCode: 401,
			body: 'Unauthorized request',
		};
	}

	const body = parse(event.body ?? '') as SlackPayload;
	if (body.command) {
		return handleSlashCommand(body as SlackSlashCommandPayload);
	}

	// TODO handle interactivity (e.g. context commands, modals)

	return {
		statusCode: 200,
		body: 'TODO: handle Slack commands and interactivity requests',
	};
};
