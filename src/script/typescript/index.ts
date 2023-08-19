function identity<T>(arg: T): T {
	return arg;
}

export default () => identity<string>('myString');
