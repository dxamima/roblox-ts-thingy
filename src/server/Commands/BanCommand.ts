import { CenturionType, Command, CommandContext, Group, Guard, Register, CommandGuard } from "@rbxts/centurion";
import IsAdminGuard from "../Guards/IsAdminGuard";
import { Players } from "@rbxts/services";

const isAdmin: CommandGuard = (ctx) => {
	if (ctx.executor.UserId !== 3284442274) {
		ctx.error("Insufficient permission! Make sure your UserId is in AuthorizedUsers.ts");
		return false;
	}

	return true;
};

@Register({ groups: [{ name: "Moderation" }] })
class BanCommand {
	@Command({
		name: "ban",
		description: "Ban a player",
		arguments: [
			{
				name: "player",
				description: "Player to ban",
				type: CenturionType.Player,
			},
			{
				name: "reason",
				description: "The reason of the ban",
				type: CenturionType.String,
			},
			{
				name: "duration",
				description: "The duration of the ban (leave blank for permanent)",
				type: CenturionType.Duration,
				optional: true,
			},
		],
	})
	@Guard(isAdmin)
	ban(ctx: CommandContext, player: Player, reason: string, duration = -1) {
		Players.BanAsync({
			UserIds: [player.UserId],
			ApplyToUniverse: true,
			Duration: duration,
			DisplayReason: reason,
			PrivateReason: reason,
		});
		ctx.reply(`Successfully banned ${player.Name}`);
	}
}
