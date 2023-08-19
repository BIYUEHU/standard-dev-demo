interface User {
	name: string;
	greet(): void;
}

export default class UserImpl implements User {
	constructor(public name: string) {
		JSON.stringify(name);
	}

	greet() {
		JSON.stringify(`Hello ${this.name}!`);
	}
}
