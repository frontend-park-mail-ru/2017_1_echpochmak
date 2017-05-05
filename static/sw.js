'use strict';

const CACHE_NAME = 'Gem-TD_serviceworker';

const cacheUrls = [
	'/',
	'/game/',
	'/multiplayer/',
	'/leaders/',
	'/about/',
	'/login/',
	'/register/',
];

self.addEventListener('install', function (event) {
	console.log('install');
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(cacheUrls);
			})
	);
});

self.addEventListener('fetch', function (event) {
	console.log('fetch');
	event.respondWith(
		fetch(event.request)
			.then((response) => {
				console.log('from network');
				return caches.open(CACHE_NAME)
					.then((cache) => {
						cache.put(event.request, response.clone());
						return response;
					})
			})
			.catch(() => {
				console.log('from cache');
				return caches.match(event.request);
			})
	);
});
