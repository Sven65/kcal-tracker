import { createContext } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { IndexedDBConfig } from "use-indexeddb/dist/interfaces";

export interface TrackerContextData {
	usedKcal: [number, StateUpdater<number>]
}


export const TrackerContext = createContext<TrackerContextData>({
	usedKcal: null
})


const idbConfig: IndexedDBConfig = {
	databaseName: "fruity-db",
	version: 1,
	stores: [
	  {
		name: "days",
		id: { keyPath: 'date' },
		indices: [
			{ name: "date", keyPath: "date" },
			{ name: "usedKcal", keyPath: "usedKcal" },
		],
	  },
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

 	const { add, update, getOneByKey } = useIndexedDBStore("days");


	useEffect(() => {
		getOneByKey('date', getDateId()).then((data) => {
			if (!data) {
				data = {date: getDateId(), usedKcal: 0}
				add({data})
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

	const trackerContext: TrackerContextData = {
		usedKcal: [usedKcal, setUsedKcal]
	}


	return (
		<TrackerContext.Provider value={trackerContext}>
			{children}
		</TrackerContext.Provider>
	)
}