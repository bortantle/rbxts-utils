import { TweenInstanceData } from "../types";
import { Tween } from "./tween";

export const tweenManager = new (class TweenManager {
	CreateSingle<T extends Instance>(
		instance: T,
		tweenInfo: TweenInfo,
		propertyTable: Partial<ExtractMembers<T, Tweenable>>,
	) {
		return new Tween([{ Instance: instance, Goal: propertyTable }], tweenInfo);
	}

	Create<T extends Instance>(instance: TweenInstanceData<T>[], tweenInfo: TweenInfo) {
		return new Tween(instance, tweenInfo);
	}

	CreateTable<T extends Instance>(instance: T, Goal: Partial<ExtractMembers<T, Tweenable>>) {
		return [{ Instance: instance, Goal }];
	}

	CreateMassTable<T extends Instance>(Data: { Instance: T, Goal: Partial<ExtractMembers<T, Tweenable>> }[]) {
		return Data as TweenInstanceData<Instance>[];
	}

})();
