# Why? 
This module was created in order to get smooth tweens in the client by replicating the server's tweening with a RemoteEvent.
However the code of this module is quite a mess and I don't recommend using it for now until I clean it up.

# How to use
## Server
```typescript
import { TweenManager } from "@rbxts/tweenreplicator";
TweenManager.Create(
	[
		{
			Instance: Part1,
			Goal: {
				Transparency: 0.2,
			},
		},
		{
			Instance: Part2,
			Goal: {
				Transparency: 0.5,
			},
		},
	],
	new TweenInfo(1),
).Play();
```
## Client
```typescript
import { TweenReceiver } from "@rbxts/tweenreplicator";

new TweenReceiver().start()
```

## TweenManager Methods
> Create(Instances: TweenData[], TweenInfo: TweenInfo) - Creates a new tween for multiple instances with the specified TweenInfo.
- TweenData is an array of objects with the Instance and Goal properties.
- returns Tween

## Tween Methods
> Play(optional Player: Player | Player[]) - Plays the tween for the specified player(s) or the whole server.
- If Player is specified the tween wont replicate to the server. 

> Pause(optional Player: Player | Player[]) - Pauses the tween for the specified player(s) or the whole server.
- If Player is specified the tween wont replicate to the server.


# Extra 
Remember to require/import the Module in the server  to create the RemoteEvent