import Lerps from "@rbxts/lerp-functions";
import { ParticleEmitterProps, Vector3Sequence } from "../types";
import { ParticleLifeCycle } from "../util/ParticleLifeCycle";
import { emitDirection } from "../util/emitDirections";
import { lerpColorSequence, lerpNumberSequence } from "../util/lerpsequence";
const defaultSettings: ParticleEmitterProps = {
    Acceleration: new Vector3(0, 0, 0),
    Color: new ColorSequence(new Color3(1, 1, 1)),
    Drag: 0,
    EmissionDirection: Enum.NormalId.Top,
    Enabled: true,
    Lifetime: new NumberRange(0, 0),
    LockedToPart: false,
    Orientation: Enum.ParticleOrientation.VelocityPerpendicular,
    Rate: 0,
    RotSpeed: new NumberRange(0, 0),
    Rotation: new NumberRange(0, 0),
    Size: {
        X: new NumberSequence(1),
        Y: new NumberSequence(1),
        Z: new NumberSequence(1)
    },
    Speed: new NumberRange(0, 0),
    SpreadAngle: Vector3.zero,
    Squash: new NumberSequence(1),
    Texture: "",
    TimeScale: 1,
    Transparency: new NumberSequence(0),
    VelocityInheritance: 0,
    VelocitySpread: 0,
    // WindAffectsDrag: false,
    // ZOffset: 0,
    Part: new Instance("Part")
}

export class Particle {
    Parent: Instance;
        Acceleration: Vector3;
        Color: ColorSequence;
        Drag: number;
        EmissionDirection: Enum.NormalId;
        Lifetime: number;
        LockedToPart: boolean;
        Orientation: Enum.ParticleOrientation;
        Rate: number;
        RotSpeed: NumberRange;
        Rotation: NumberRange;
        Size: Vector3Sequence;
        Speed: number;
        SpreadAngle: Vector3;
        Squash: NumberSequence;
        Texture: string;
        TimeScale: number;
        Transparency: NumberSequence;
        VelocityInheritance: number;
        VelocitySpread: number;
        Part: Part | BasePart | MeshPart
        Direction: Vector3
        OriginalValues: {
            Position: Vector3,
            Size: Vector3,
            Transparency: number,
        }
        CreationTime: number 

    constructor(Parent: Part | BasePart | MeshPart | Attachment, Props: Partial<ParticleEmitterProps>, EventProps: {
        onDestroy?(): void,
        onEmit?(Part: Part | BasePart | MeshPart): void,
        OnTouch?(BasePart: BasePart): void
    } ) {
        // default particle attributes
        this.Acceleration = Props.Acceleration ?? defaultSettings.Acceleration;
        this.Color = Props.Color ?? defaultSettings.Color;
        this.Drag = Props.Drag ?? defaultSettings.Drag;
        this.EmissionDirection = Props.EmissionDirection ?? defaultSettings.EmissionDirection;
        this.Lifetime = Props.Lifetime ? math.random(Props.Lifetime.Min, Props.Lifetime.Max) : math.random(defaultSettings.Lifetime.Min, defaultSettings.Lifetime.Max)
        this.LockedToPart = Props.LockedToPart ?? defaultSettings.LockedToPart;
        this.Orientation = Props.Orientation ?? defaultSettings.Orientation;
        this.Rate = Props.Rate ?? defaultSettings.Rate;
        this.RotSpeed = Props.RotSpeed ?? defaultSettings.RotSpeed;
        this.Rotation = Props.Rotation ?? defaultSettings.Rotation;
        this.Size = Props.Size ?? defaultSettings.Size;
        this.Speed = Props.Speed ? math.random(Props.Speed.Min, Props.Speed.Max) : math.random(defaultSettings.Speed.Min, defaultSettings.Speed.Max)
        this.SpreadAngle = Props.SpreadAngle ?? defaultSettings.SpreadAngle;
        this.Squash = Props.Squash ?? defaultSettings.Squash;
        this.Texture = Props.Texture ?? defaultSettings.Texture;
        this.TimeScale = Props.TimeScale ?? defaultSettings.TimeScale;
        this.Transparency = Props.Transparency ?? defaultSettings.Transparency;
        this.VelocityInheritance = Props.VelocityInheritance ?? defaultSettings.VelocityInheritance;
        this.VelocitySpread = Props.VelocitySpread ?? defaultSettings.VelocitySpread;
        this.Direction = Props.CustomDirection ?? emitDirection[this.EmissionDirection.Name]
        this.Parent = Parent 
        this.Part = Props.Part?.Clone() ?? defaultSettings.Part.Clone();

        this.Part.Anchored = true 
        this.Part.CanCollide = false 
        this.Part.CanTouch = EventProps.OnTouch && true ? true : false
        this.Part.CFrame = Parent.CFrame.add(this.SpreadAngle.mul(math.noise(this.Part.Position.X, this.Part.Position.Y, this.Part.Position.Z)))

        if(EventProps.OnTouch && this.Part.CanTouch) {
            this.Part.Touched.Connect((BasePart) => EventProps.OnTouch?.(BasePart))
        }
        this.Part.Parent = Parent
        this.OriginalValues = {
            Position: this.Part.Position,
            Size: this.Part.Size,
            Transparency: this.Part.Transparency,
        }
        this.CreationTime = tick()
        ParticleLifeCycle.addParticle(this)
        EventProps.onEmit?.(this.Part)
    }

    Destroy(): void {
        ParticleLifeCycle.Particles.filter(e=> e !== this)
        if(this.Part) this.Part.Destroy()
    }

    Update(): void {
        const Part = this.Part
        if(!Part) return this.Destroy();
        const time = (tick() - this.CreationTime) / this.Lifetime

        Part.Color = lerpColorSequence(this.Color, time)
        Part.Size = new Vector3(lerpNumberSequence(this.Size.X, time), lerpNumberSequence(this.Size.Y, time), lerpNumberSequence(this.Size.Z, time))
        Part.CFrame = Part.CFrame.add(this.Direction.mul(this.Speed))
        Part.Transparency = lerpNumberSequence(this.Transparency, time)
        // TODO: ROTATION

        if(time >= 1) this.Destroy()
    }
}