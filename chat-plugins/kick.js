exports.commands = {
	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return;
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) {
			return this.sendReply("Utilisateur " + this.targetUsername + " non trouvé.");
		}
		if (!room.users[targetUser.userid]) {
			return this.sendReply("L'utilisateur " + this.targetUsername + " n'est pas dans la salle " + room.id + ".");
		}
		if (!this.can('kick', targetUser, room)) return false;
		var msg = "éjecté de la salle " + room.id + " par " + user.name + (target ? " (" + target + ")" : "") + ".";
		this.addModCommand("" + targetUser.name + " a été " + msg);
		targetUser.popup("Tu as été " + msg);
		targetUser.leaveRoom(room);
	}
};
