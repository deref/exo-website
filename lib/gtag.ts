export const GA_TRACKING_ID = "G-64SSYNEJ9B";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
	if (!!window && !!window?.gtag) {
		window.gtag("config", GA_TRACKING_ID, {
			page_path: url,
		});
	}
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (params: {
	actionName: string;
	eventParams?: Gtag.EventParams;
	callback?: () => void;
}) => {
	let callbackFired = false;
	const doCallback = () => {
		if (!callbackFired && params.callback) {
			callbackFired = true;
			params.callback();
		}
	};

	setTimeout(doCallback, 100);
	if (!!window && !!window?.gtag) {
		window.gtag("event", params.actionName, {
			...params.eventParams,
			event_callback: doCallback,
		});
	}
};
