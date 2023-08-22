import { TweenService } from "@rbxts/services";
import { TweenAction, TweenData, TweenInstanceData, exportedTween } from "../types";
import { Remote } from "./remote";

export class TweenReceiver {
    private CurrentTweens: {[instance: string]: Tween[] | undefined} = {}
    constructor() {}

    private registerTween(TweenId: string, Tween: Tween) {
        const current = this.CurrentTweens[TweenId] || []
        this.CurrentTweens[TweenId] = [...current, Tween]
    }

    private getTweens(TweenId: string) {
        return this.CurrentTweens[TweenId]
    }

    private useRemote(Action: TweenAction, TweenData: TweenData)  {
        switch(Action) {
            case "Start": {
                const tweenInfo = new TweenInfo(...TweenData.tweenInfo)
                TweenData.Instances.forEach((InstanceData) => {
                    const Tween = TweenService.Create(InstanceData.Instance, tweenInfo, InstanceData.Goal)
                    this.registerTween(TweenData.id, Tween)
                    Tween.Play()
                })

                task.delay(tweenInfo.Time, () => {
                        this.CurrentTweens[TweenData.id] = undefined
                })
                break
            }

            case "Stop": {
                const Tweens = this.getTweens(TweenData.id)
                if (Tweens) {
                Tweens.forEach(Tween => {
                    Tween.Cancel()
                })
                }
            }
        }
    }
    start() {
        Remote.OnClientEvent.Connect((...args) => this.useRemote(...args))
    }
}