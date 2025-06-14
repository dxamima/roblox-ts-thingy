import { CenturionType, Command, CommandContext, Group, Guard, Register, CommandGuard } from "@rbxts/centurion";
import IsAdminGuard from "../Guards/IsAdminGuard";

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
			{
				name: "reason",
				description: "The reason for the kick",
				type: CenturionType.String,
			},
		],
	})
	@Guard(IsAdminGuard)
	kick(ctx: CommandContext, player: Player, reason: string) {
		player.Kick(`You hae been kicked from the server by ${ctx.executor.Name} for ${reason}`);
		ctx.reply(`Successfully kicked ${player.Name}`);
	}
}
