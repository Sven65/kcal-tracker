import { createContext } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { IndexedDBConfig } from "use-indexeddb/dist/interfaces";

export interface LineItem {
	id: number,
	timestamp: string,
	date: string,
	value: number,
	name: string
}

export interface TrackerContextData {
	date: string,
	usedKcal: [number, StateUpdater<number>]
	lineItems: [LineItem[], (name: string, value: number) => void, (id: number) => void]
}



export const TrackerContext = createContext<TrackerContextData>({
	date: null,
	usedKcal: null,
	lineItems: null,
})


const idbConfig: IndexedDBConfig = {
	databaseName: "fruity-db",
	version: 3,
	stores: [
	  {
		name: "days",
		id: { keyPath: 'date' },
		indices: [
			{ name: "date", keyPath: "date" },
			{ name: "usedKcal", keyPath: "usedKcal" },
		],
	  },
	  {
		name: 'lineItems',
		id: {keyPath: 'id', autoIncrement: true},
		indices: [
			{ name: 'id', keyPath: 'id' },
			{ name: 'timestamp', keyPath: 'timestamp' },
			{ name: 'date', keyPath: 'date' },
			{ name: 'kcal', keyPath: 'kcal' },
			{ name: 'name', keyPath: 'name' },
		]
	  }
	],
  };
  

const getDateId = (): string => {
	const date = new Date()

	return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

// addLineItem: (name: string, value: number) => void,

const findLineItemById = (lineItems: LineItem[], id: number): LineItem => {
	return lineItems.find(item => item.id === id)
}


export const TrackerContextProvider = ({children}) => {
	let [trackerContextData, setTrackerContextData] = useState(null)
	let [loadedLineItems, setLoadedLineItems] = useState(null)

	useEffect(() => {
		setupIndexedDB(idbConfig)
		  	.then(() => {
				console.log("success")
			})
		  	.catch(e => console.error("error / unsupported", e));
	}, []);

 	const { add: addDay, update, getOneByKey } = useIndexedDBStore("days");
	const { add: addLineItemToDb, getManyByKey: getManyLineItemsByKey, deleteByID: deleteLineItemByID } = useIndexedDBStore("lineItems");



	useEffect(() => {
		getOneByKey('date', getDateId()).then((data) => {
			if (!data) {
				data = {date: getDateId(), usedKcal: 0}
				addDay({data})
			}
			
			setTrackerContextData(data)
		})
		.catch(e => {
			console.error(e)
		})
	}, [])

	useEffect(() => {
		getManyLineItemsByKey('date', getDateId()).then((data) => {
			console.log("got lineItems data", data)

			if (!data) {
				return
			}

			setLoadedLineItems(data)

		})
		.catch(e => {
			console.error(e)
		})
	}, [])

	if (!trackerContextData || !loadedLineItems) return <h1>Loading</h1>
	
	const [usedKcal, setUsedKcalCtx] = useState(trackerContextData.usedKcal || 0)
	const [lineItems, setLineItems] = useState(loadedLineItems)


	const setUsedKcal = (value: number) => {
		update({date: getDateId(), usedKcal: value})
		setUsedKcalCtx(value)
	}

	const addLineItem = (name: string, value: number) => {
		addLineItemToDb({date: getDateId(), timestamp: Date.now(), name, value}).then(id => {
			setLineItems([
				...lineItems,
				{date: getDateId(), timestamp: Date.now(), name, value, id},
			])
		})
	}

	const deleteLineItem = (id: number) => {
		const item = findLineItemById(lineItems, id)

		const newKcal = usedKcal - item.value

		update({date: getDateId(), usedKcal: newKcal})
		setUsedKcalCtx(newKcal)

		const newLineItems = lineItems.filter((item) => item.id !== id)

		setLineItems(newLineItems)

		deleteLineItemByID(id)

	
	}

	const trackerContext: TrackerContextData = {
		date: getDateId(),
		usedKcal: [usedKcal, setUsedKcal],
		lineItems: [lineItems, addLineItem, deleteLineItem],
	}


	return (
		<TrackerContext.Provider value={trackerContext}>
			{children}
		</TrackerContext.Provider>
	)
}