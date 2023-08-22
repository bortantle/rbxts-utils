import { HttpService } from "@rbxts/services";
import type { TweenAction, TweenInstanceData, Widen } from "../types";
import { sendAction } from "../utils/broadcast";
import { exportTween } from "../utils/exportTweenInfo";

function lerp(a: number, b: number, alpha: number) {
	return a + (b - a) * alpha;
}

export class Tween<T extends Instance> {
	public readonly instance: TweenInstanceData<T>[];
	public readonly tweenInfo: TweenInfo;
	private readonly id: string;
	private didPause: boolean = false;
	private startTime?: number;

	constructor(instance: TweenInstanceData<T>[], tweenInfo: TweenInfo) {
		this.instance = instance;
		this.tweenInfo = tweenInfo;
		this.id = HttpService.GenerateGUID();
	}

	private send(Action: TweenAction, Player?: Player) {
		sendAction(
			Action,
			{
				Instances: this.instance,
				tweenInfo: exportTween(this.tweenInfo),
				startTime: os.clock(),
				id: this.id,
			},
			Player,
		);
	}

	public Add<c extends Instance>(instance: TweenInstanceData<c>) {
		if(this.startTime) return warn("You cannot add an instance to a tween that has already started")
		this.instance.push(instance as unknown as TweenInstanceData<T>);
	}

	public Play(Player?: Player | Player[]) {
		if (Player) {
			if (typeIs(Player, "Instance") && classIs(Player, "Player")) {
				this.send("Start", Player);
			} else Player.forEach((Player) => this.send("Start", Player));
		} else {
			this.startTime = os.time();
			this.send("Start");
		}

		if (!Player)
			task.delay(this.tweenInfo.Time + this.tweenInfo.DelayTime, () => {
				if (this.didPause) return;
				this.instance.forEach((InstanceData) => {
					if (InstanceData.Instance)
						for (const [key, v] of pairs(InstanceData.Goal)) {
							const k = key as string;
							const instance = InstanceData.Instance as unknown as { [key: string]: typeof v };
							instance[k] = v;
						}
				});
			});
	}

	public Stop(Player?: Player | Player[]) {
		if (!this.startTime) return warn("Attemped to stop a tween that was never started");
		if (Player) {
			if (typeIs(Player, "Instance") && classIs(Player, "Player")) {
				this.send("Stop", Player);
			} else Player.forEach((Player) => this.send("Stop", Player));
		} else {
			this.send("Stop");
			const time = os.time() - this.startTime;
			const alpha = (time - this.tweenInfo.DelayTime) / this.tweenInfo.Time;
			this.instance.forEach((InstanceData) => {
				if (InstanceData.Instance)
					for (const [key, v] of pairs(InstanceData.Goal)) {
						const k = key as string;
						const instance = InstanceData.Instance as unknown as { [key: string]: typeof v };
						const currentValue = instance[k] as typeof v;

						if (typeIs(v, "number") && typeIs(currentValue, "number")) {
							instance[k] = lerp(currentValue, v, alpha);
						} else if (typeIs(v, "boolean")) {
							instance[k] = v;
						} else if (typeIs(v, "UDim2") && typeIs(currentValue, "UDim2")) {
							instance[k] = new UDim2(
								lerp(currentValue.X.Scale, v.X.Scale, alpha),
								lerp(currentValue.X.Offset, v.X.Offset, alpha),
								lerp(currentValue.Y.Scale, v.Y.Scale, alpha),
								lerp(currentValue.Y.Offset, v.Y.Offset, alpha),
							);
						} else if (typeIs(v, "UDim") && typeIs(currentValue, "UDim")) {
							instance[k] = new UDim(
								lerp(currentValue.Scale, v.Scale, alpha),
								lerp(currentValue.Offset, v.Offset, alpha),
							);
						} else if (typeIs(v, "Color3") && typeIs(currentValue, "Color3")) {
							instance[k] = new Color3(
								lerp(currentValue.R, v.R, alpha),
								lerp(currentValue.G, v.G, alpha),
								lerp(currentValue.B, v.B, alpha),
							);
						} else if (typeIs(v, "Vector2") && typeIs(currentValue, "Vector2")) {
							instance[k] = new Vector2(
								lerp(currentValue.X, v.X, alpha),
								lerp(currentValue.Y, v.Y, alpha),
							);
						} else if (typeIs(v, "Vector3") && typeIs(currentValue, "Vector3")) {
							instance[k] = new Vector3(
								lerp(currentValue.X, v.X, alpha),
								lerp(currentValue.Y, v.Y, alpha),
								lerp(currentValue.Z, v.Z, alpha),
							);
						} else if (typeIs(v, "CFrame") && typeIs(currentValue, "CFrame")) {
							instance[k] = currentValue.Lerp(v, alpha);
						} else if (typeIs(v, "Rect") && typeIs(currentValue, "Rect")) {
							instance[k] = new Rect(
								lerp(currentValue.Min.X, v.Min.X, alpha),
								lerp(currentValue.Min.Y, v.Min.Y, alpha),
								lerp(currentValue.Max.X, v.Max.X, alpha),
								lerp(currentValue.Max.Y, v.Max.Y, alpha),
							);
						} else if (typeIs(v, "Vector2int16") && typeIs(currentValue, "Vector2int16")) {
							instance[k] = new Vector2int16(
								lerp(currentValue.X, v.X, alpha),
								lerp(currentValue.Y, v.Y, alpha),
							);
						}
					}
			});
		}
	}
}
