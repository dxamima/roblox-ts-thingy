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

@Register({ groups: [{ name: "Developer" }] })
class Addpoints {
	@Command({
		name: "addpoints",
		description: "Add points to a player",
		arguments: [
			{
				name: "To",
				description: "The player to give points to",
				type: CenturionType.Player,
			},
			{
				name: "How many",
				description: "How many points?",
				type: CenturionType.Number,
			},
		],
	})
	@Guard(isAdmin)
	addpoints(ctx: CommandContext, player: Player, points: number) {
		const pointsValue = Players.WaitForChild(player.Name)
			.WaitForChild("leaderstats")
			.WaitForChild("Points") as NumberValue;
		pointsValue.Value += points;
		ctx.reply(`Gave ${points} Points to ${player.Name}`);
	}
}
