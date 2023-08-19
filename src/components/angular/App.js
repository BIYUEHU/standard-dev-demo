export const Component = param => {
	const result = JSON.stringify(param);
	return result;
};

export default () =>
	Component({
		selector: 'hello-component',
		template: `<div>Hello Angular!</div>`,
	});
