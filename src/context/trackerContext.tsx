import { createContext } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { IndexedDBConfig } from "use-indexeddb/dist/interfaces";

export interface TrackerContextData {
	usedKcal: [number, StateUpdater<number>]
	addLineItem: (name: string, value: number) => void,
}


export const TrackerContext = createContext<TrackerContextData>({
	usedKcal: null,
	addLineItem: () => {},
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



export const TrackerContextProvider = ({children}) => {
	let [trackerContextData, setTrackerContextData] = useState(null)

	useEffect(() => {
		setupIndexedDB(idbConfig)
		  	.then(() => {
				console.log("success")
			})
		  	.catch(e => console.error("error / unsupported", e));
	}, []);

 	const { add: addDay, update, getOneByKey } = useIndexedDBStore("days");
	const { add: addLineItemToDb } = useIndexedDBStore("lineItems");



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

	if (!trackerContextData) return <h1>Loading</h1>
	
	const [usedKcal, setUsedKcalCtx] = useState(trackerContextData.usedKcal || 0)

	const setUsedKcal = (value: number) => {
		update({date: getDateId(), usedKcal: value})
		setUsedKcalCtx(value)
	}

	const addLineItem = (name: string, value: number) => {
		addLineItemToDb({date: getDateId(), timestamp: Date.now(), name, value})
	}

	const trackerContext: TrackerContextData = {
		usedKcal: [usedKcal, setUsedKcal],
		addLineItem,
	}


	return (
		<TrackerContext.Provider value={trackerContext}>
			{children}
		</TrackerContext.Provider>
	)
}