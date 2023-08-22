import { Remote } from "../structure/remote";
import { TweenAction, TweenData } from "../types";

export function sendAction(Action: TweenAction, TweenData: TweenData, Player?: Player) {
    if(Player) {
        Remote.FireClient(Player, Action, TweenData)
    } else {
        Remote.FireAllClients(Action, TweenData)
    }
}