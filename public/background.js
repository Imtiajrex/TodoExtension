/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.get("periodic", (a) => {
		if (!a) chrome.alarms.create("periodic", { when: Date.now() + 1000 });
	});
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
	chrome.storage.sync.get("data", (result) => {
		const taskListItem = result.data;
		console.log("taskListItem", taskListItem);
		if (taskListItem) {
			const taskList = JSON.parse(taskListItem);
			if (taskList && taskList.length > 0) {
				const firstTask = taskList[0];
				chrome.notifications.create(firstTask.id, {
					type: "basic",
					iconUrl: "logo192.png",
					title: `You have ${taskList.length} tasks to do`,
					message: `First Task: ${firstTask.task}`,
					priority: 1,
				});
			}
		}
	});
});
