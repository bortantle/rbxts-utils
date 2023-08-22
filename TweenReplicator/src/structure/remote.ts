import { ReplicatedStorage, RunService } from "@rbxts/services"
import { RemoteCallBack } from "../types"

let r: RemoteEvent<RemoteCallBack>

if(RunService.IsServer()) {
    r = new Instance("RemoteEvent") as RemoteEvent<RemoteCallBack>
    r.Name = "TweenBroadcaster"
    r.Parent = ReplicatedStorage
} else {
    r = ReplicatedStorage.WaitForChild("TweenBroadcaster") as RemoteEvent<RemoteCallBack>
}
export const Remote = r 