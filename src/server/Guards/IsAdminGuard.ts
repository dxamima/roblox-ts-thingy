import { CommandContext } from "@rbxts/centurion";

export default function IsAdminGuard(ctx: CommandContext) {
	const executor: Player = ctx.executor;
	return ["OnlyJ0nathan"].includes(executor.Name);
	return true;
}
