export interface ParticleEmitterProps {
	Acceleration: Vector3;
	Color: ColorSequence;
	Drag: number;
	EmissionDirection: Enum.NormalId;
	Enabled: boolean;
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
	Part: BasePart | MeshPart | Part;
	CustomDirection?: Vector3
}

export type Vector3Sequence = {
	X: NumberSequence,
	Y: NumberSequence,
	Z: NumberSequence
}