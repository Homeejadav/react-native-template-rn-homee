export default (func, wait = 2000) => {
	let tapCount = 0;
	let handler;

	return function () {
		if (tapCount === 0) {
			tapCount++;
			func();
		}

		clearTimeout(handler);
		handler = setTimeout(() => (tapCount = 0), wait);
	};
};
