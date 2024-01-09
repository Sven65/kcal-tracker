import { LineItem } from "../../context/trackerContext"

interface Props {
	lineItems: LineItem[]
}

const ItemTable = ({
	lineItems
}: Props) => {
	return (
		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							Date
						</th>
						<th scope="col" class="px-6 py-3">
							Name
						</th>
						<th scope="col" class="px-6 py-3">
							Kcal
						</th>
					</tr>
				</thead>
				<tbody>
					{lineItems.map(({date, id, value, name}) => (
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

							<td class="px-6 py-4">
								{date}
							</td>
							<td class="px-6 py-4">
								{name}
							</td>
							<td class="px-6 py-4">
								{value}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ItemTable
