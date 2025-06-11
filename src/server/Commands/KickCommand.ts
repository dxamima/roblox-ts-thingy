import { CenturionType, Command, CommandContext, Group, Guard, Register, CommandGuard } from "@rbxts/centurion";
import IsAdminGuard from "../Guards/IsAdminGuard";

const isAdmin: CommandGuard = (ctx) => {
	if (ctx.executor.UserId !== 3284442274) {
		ctx.error("Insufficient permission! Make sure your UserId is in AuthorizedUsers.ts");
		return false;
	}

	return true;
};

@Register({ groups: [{ name: "Moderation" }] })
class KickCommand {
	@Command({
		name: "kick",
		description: "Kick a player",
		arguments: [
			{
				name: "player",
				description: "Player to kick",
				type: CenturionType.Player,
			},
		],
	})
	@Guard(isAdmin)
	kick(ctx: CommandContext, player: Player) {
		player.Kick("You have been kicked from the server.");
		ctx.reply(`Successfully kicked ${player.Name}`);
	}
}
