export function getInverseVector(vector: Vector3) {
	const Inversevector = new Vector3(
		math.abs(vector.X),
		math.abs(vector.Y),
		math.abs(vector.Z)
	)
	return Inversevector.mul(-1).add(Vector3.one)
    }

export function splitInverseVector(vector: Vector3) {
	let a

	if(vector.X === 0) a = Vector3.xAxis
	else if (vector.Y === 0) a = Vector3.yAxis
	else if(vector.Z === 0) a = Vector3.zAxis

	return a as Vector3, vector
}

