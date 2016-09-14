/* @flow */
declare var context: {
	targetRequest: {
		body: {
			asJSON: Object,
		},
	},
	getVariable(name: string): string,
	setVariable(name: string, value: string): void,
	proxyResponse: {
		content: string;
	},
};

declare function unescape(string: string): string;
