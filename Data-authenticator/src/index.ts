type valueOf<T> = T[keyof T];

export default function AutenticateData<tableType>(defaultData: tableType, possibleData: unknown) {
	/**
   * Returns the fixed data, converts the newData to the defaultData type 
   * 
   * @param tableType - The type of the object
   * @param defaultData - The default data that will be used to convert the newData to the correct type if the newdata does not match the defaultData type it will take a default value
   * @param possibleData - The new data that will be converted to the defaultData type
   * @returns Returns the newData object but with the correct type, and safe data.
   *
   */
	assert(typeIs(defaultData, "table"), "Data Autenticator: defaultData must be a table")
	if(!typeIs(possibleData, "table")) return defaultData;
	const parsedData = <tableType>{}
	const newData = <tableType>possibleData
	
	for(const [k, v] of pairs(defaultData)) {
		const key = k as keyof tableType
		const value = v as valueOf<tableType>

		const newValue = newData[key]
		if(type(newValue) !== type(value)) {
			parsedData[key] = value  
			continue;
		}

		if(type(newValue) === "table") {
			parsedData[key] = AutenticateData<typeof value>(value, newValue)
			continue;
		}

		parsedData[key] = newValue
	}
	return parsedData
}
