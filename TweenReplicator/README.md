# Why? 
This module was created in order to get smooth tweens in the client by replicating the server's tweening with a RemoteEvent.
It hasn't been tested a lot for now if you **DON'T** need multiples tweens replicated at once i recommend using [TweenServiceV2](https://github.com/Steadyon/TweenServiceV2) or your own system.

# How to use
## Server
```typescript
import { TweenManager } from "@rbxts/tweenreplicator";
// If every Instance is the same type you can make all of them at once
TweenManager.Create<Part>(
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

// If you have multiple types i recomend using Tween.Add
const Tween = TweenManager.Create<Instance>([], new TweenInfo(1));
Tween.Add<Part>(Part, { Transparency: 0.2 });
Tween.Add<Decal>(Decal, { Transparency: 0.5 });
Tween.Play();
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

> Stop(optional Player: Player | Player[]) - Pauses the tween for the specified player(s) or the whole server.
- If Player is specified the tween wont replicate to the server.

> Add(TweenInstanceData: {
    Instance: Instance,
    Goal: TableOfGoals
}) 
- Adds an Instance to the current tween 


# Extra 
Remember to require/import the Module in the server  to create the RemoteEvent