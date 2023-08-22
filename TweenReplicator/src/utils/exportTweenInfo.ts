import { exportedTween } from "../types";

export function exportTween(TweenInfo: TweenInfo) {
    return [TweenInfo.Time, TweenInfo.EasingStyle, TweenInfo.EasingDirection, TweenInfo.RepeatCount, TweenInfo.Reverses, TweenInfo.DelayTime] as exportedTween
}