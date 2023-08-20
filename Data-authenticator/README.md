## Warning 
Sadly this dosen't support arrays :(

## Example Usage 
```typescript
import DataAuthenticator from "@rbxts/table-authenticator"
interface PlayerInfo {
    Coins: number,
    Gems: number,
    Level: number
}
const defaultPlayerData: PlayerInfo = {
    Coins: 0,
    Gems: 0,
    Level: 1
}

const dataToBePatched = {
    Coins: "hey",
    Gems: 2,
    Level: false
}

DataAuthenticator<PlayerInfo>(defaultPlayerData, dataToBePatched) 
/*
returns {
    Coins: 0,
    Gems: 2,
    Level: 1
}
*/
```