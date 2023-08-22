export type exportedTween = [number, Enum.EasingStyle, Enum.EasingDirection, number, boolean, number]

export type TweenAction = "Start" | "Stop" 

export interface TweenInstanceData<T extends Instance> {
    Instance: T,
    Goal: Partial<ExtractMembers<T, Tweenable>>
}

export interface TweenData {
    Instances: TweenInstanceData<Instance>[],
    tweenInfo: exportedTween,
    startTime: number,
    id: string
}

export type RemoteCallBack = (Action: TweenAction, Data: TweenData) => void
export type Widen<T> = T extends number ? number : T extends boolean ? boolean : T extends CFrame ? CFrame : T extends Rect ? Rect : T extends Color3 ? Color3 : T extends UDim ? UDim : T extends UDim2 ? UDim2 : T extends Vector2 ? Vector2 : T extends Vector2int16 ? Vector2int16 : T extends Vector3 ? Vector3 : T;