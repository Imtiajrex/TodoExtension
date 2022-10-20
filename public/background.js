/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.get("periodic", (a) => {
		if (!a) chrome.alarms.create("periodic", { periodInMinutes: 1 });
	});
});

chrome.alarms.onAlarm.addListener((alarm) => {
	chrome.notifications.create("test", {
		type: "basic",
		iconUrl: "logo.png",
		title: "notification title",
		message: "notification message",
		priority: 2,
	});
});
