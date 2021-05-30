module.exports = {
	name: 'test',
	description: 'Penisair',
	execute(message) {
		const memberPermissions = message.member.permissions.toArray();
		const n = memberPermissions.toString();
		const q = n.replace(/_/g, " ");
		const z = q.replace(/,/g, ', ');
		const w = z.toLowerCase();
		const p = w.replace("add reactions, view audit log, ", "");
		const a = p.replace("create instant invite, ", "");
		const b = a.replace("priority speaker, ", "");
		const c = b.replace("stream, ", "");
		const e = c.replace("view channel, ", "");
		const f = e.replace("send messages, ", "");
		const g = f.replace("send tts messages, ", "");
		const h = g.replace("embed links, ", "");
		const i = h.replace("attach files, ", "");
		const j = i.replace("read message history, ", "");
		const k = j.replace("use external emojis, ", "");
		const l = k.replace("view guild insights, ", "");
		const m = l.replace("connect, ", "");
		const u = m.replace("speak, ", "");
		const o = u.replace("mute members, ", "");
		const r = o.replace("deafen members, ", "");
		const s = r.replace("move members, ", "");
		const t = s.replace("use vad, ", "");
		const x = t.replace("change nickname, ", "");

		const mySentence = x;
		const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

		
		
		message.channel.send(finalSentence)
	},
};