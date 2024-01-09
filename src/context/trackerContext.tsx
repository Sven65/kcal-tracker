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
	usedKcal: [number, StateUpdater<number>]
	lineItems: [LineItem[], (me: string, value: number) => void]
}



export const TrackerContext = createContext<TrackerContextData>({
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
	const { add: addLineItemToDb, getManyByKey: getManyLineItemsByKey } = useIndexedDBStore("lineItems");



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
		setLineItems([
			...lineItems,
			{date: getDateId(), timestamp: Date.now(), name, value},
		])
		addLineItemToDb({date: getDateId(), timestamp: Date.now(), name, value})
	}

	const trackerContext: TrackerContextData = {
		usedKcal: [usedKcal, setUsedKcal],
		lineItems: [lineItems, addLineItem],
	}


	return (
		<TrackerContext.Provider value={trackerContext}>
			{children}
		</TrackerContext.Provider>
	)
}