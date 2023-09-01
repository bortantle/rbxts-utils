import { ParticleEmitterProps, Vector3Sequence } from "../types";
import { ParticleLifeCycle } from "../util/ParticleLifeCycle";
import { Particle } from "./Particle";

const defaultSettings: ParticleEmitterProps = {
    Acceleration: Vector3.zero,
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
    Part: new Instance("Part")
}

export class ParticleEmitter {
        Acceleration: Vector3;
        Color: ColorSequence;
        Drag: number;
        EmissionDirection: Enum.NormalId;
        Lifetime: NumberRange;
        LockedToPart: boolean;
        Orientation: Enum.ParticleOrientation;
        Rate: number;
        RotSpeed: NumberRange;
        Rotation: NumberRange;
        Size: Vector3Sequence;
        Speed: NumberRange;
        SpreadAngle: Vector3;
        Squash: NumberSequence;
        Texture: string;
        TimeScale: number;
        Transparency: NumberSequence;
        VelocityInheritance: number;
        VelocitySpread: number;
        Parent: BasePart | Part | Attachment | MeshPart;
        Part: Part | BasePart | MeshPart
        Enabled: boolean;
        Direction: Vector3
        EventProps: {
            onDestroy?(): void,
            onEmit?(): void,
            onRender?(): void,
            OnTouch?(): void
        }
        
    constructor(Parent: BasePart | Part | Attachment | MeshPart, Props: Partial<ParticleEmitterProps>, EventProps: {
        onDestroy?(): void,
        onEmit?(): void,
        onRender?(): void,
        OnTouch?(): void
    }) {
        this.Acceleration = Props.Acceleration ?? defaultSettings.Acceleration;
        this.Color = Props.Color ?? defaultSettings.Color;
        this.Drag = Props.Drag ?? defaultSettings.Drag;
        this.EmissionDirection = Props.EmissionDirection ?? defaultSettings.EmissionDirection;
        this.Lifetime = Props.Lifetime ?? defaultSettings.Lifetime;
        this.LockedToPart = Props.LockedToPart ?? defaultSettings.LockedToPart;
        this.Orientation = Props.Orientation ?? defaultSettings.Orientation;
        this.Rate = Props.Rate ?? defaultSettings.Rate;
        this.RotSpeed = Props.RotSpeed ?? defaultSettings.RotSpeed;
        this.Rotation = Props.Rotation ?? defaultSettings.Rotation;
        this.Size = Props.Size ?? defaultSettings.Size;
        this.Speed = Props.Speed ?? defaultSettings.Speed;
        this.SpreadAngle = Props.SpreadAngle ?? defaultSettings.SpreadAngle;
        this.Squash = Props.Squash ?? defaultSettings.Squash;
        this.Texture = Props.Texture ?? defaultSettings.Texture;
        this.TimeScale = Props.TimeScale ?? defaultSettings.TimeScale;
        this.Transparency = Props.Transparency ?? defaultSettings.Transparency;
        this.VelocityInheritance = Props.VelocityInheritance ?? defaultSettings.VelocityInheritance;
        this.VelocitySpread = Props.VelocitySpread ?? defaultSettings.VelocitySpread;
        this.Parent = Parent
        this.Part = Props.Part ?? defaultSettings.Part
        this.Enabled = Props.Enabled ?? defaultSettings.Enabled
        this.Direction = Props.CustomDirection ?? defaultSettings.CustomDirection ?? new Vector3(0, 1, 0)
        this.EventProps = EventProps

        ParticleLifeCycle.addEmitter(this)
    }

    Emit(Count: number) {
        const { 
            Acceleration,
            Color,
            Drag,
            EmissionDirection,
            Lifetime,
            LockedToPart,
            Orientation,
            Rate,
            RotSpeed,
            Rotation,
            Size,
            Speed,
            SpreadAngle,
            Squash,
            Texture,
            TimeScale,
            Transparency,
            VelocityInheritance,
            VelocitySpread,
            Part,
            Direction: CustomDirection,
            EventProps
        } = this
        for(const k of $range(1, Count)) {
            new Particle(this.Parent, {
                Acceleration,
                Color,
                Drag,
                EmissionDirection,
                Lifetime,
                LockedToPart,
                Orientation,
                Rate,
                RotSpeed,
                Rotation,
                Size,
                Speed,
                SpreadAngle,
                Squash,
                Texture,
                TimeScale,
                Transparency,
                VelocityInheritance,
                VelocitySpread,
                Part,
                CustomDirection
            }, EventProps)
        }   
    }

    Destroy(): void {
        
    }
}