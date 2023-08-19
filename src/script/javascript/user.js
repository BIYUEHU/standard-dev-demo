async function fetchData() {
	const response = await fetch('/api/data');
	const data = await response.json();
	return data;
}

fetchData().then(data => data);
