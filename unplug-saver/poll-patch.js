/* BEGIN e5-unplug-saver (the unplug-saver app, /etc/e5-infoscreen/plugins/unplug-saver) */
// The dark screen's status poll (POLL_BLANK, 5 s: quick to see a new SMS) is
// stretched to what the unplug-saver app's GET /blank-poll says -- only while
// unplugged and the radio is off, when no SMS can come.  Asked at most
// once a minute; 5 s again without the app.  A key that lights the screen
// polls at once (setBlank), so nothing old is shown.
let unplugSaverPoll = null, unplugSaverPollAt = -Infinity;
function unplugSaverBlankPoll() {
	if (performance.now() - unplugSaverPollAt > 60000) {
		unplugSaverPollAt = performance.now();
		fetch('/api/plugins/unplug-saver/blank-poll', { cache: 'no-store' })
			.then((r) => r.ok ? r.json() : null)
			.then((r) => { unplugSaverPoll = r && r.ms > POLL_BLANK ? r.ms : null; })
			.catch(() => { unplugSaverPoll = null; });
	}
	return unplugSaverPoll || POLL_BLANK;
}
/* END e5-unplug-saver */
