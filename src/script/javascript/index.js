export default class User {
	constructor(name) {
		this.name = name;
	}

	greet() {
		return `Hello ${this.name}!`;
	}
}

const user = new User('John');
user.greet();
