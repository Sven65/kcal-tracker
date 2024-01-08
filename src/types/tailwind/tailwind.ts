export const TailwindSpacingLookup =  {
	1: 'w-1 h-1',
	2: 'w-2 h-2',
	3: 'w-3 h-3',
	4: 'w-4 h-4',
	5: 'w-5 h-5',
	6: 'w-6 h-6',
	7: 'w-7 h-7',
	8: 'w-8 h-8',
	9: 'w-9 h-9',
	10: 'w-10 h-10',
	11: 'w-11 h-11',
	12: 'w-12 h-12',
	14: 'w-14 h-14',
	16: 'w-16 h-16',
	20: 'w-20 h-20',
	24: 'w-24 h-24',
	28: 'w-28 h-28',
	32: 'w-32 h-32',
	36: 'w-36 h-36',
	40: 'w-40 h-40',
	44: 'w-44 h-44',
	48: 'w-48 h-48',
	52: 'w-52 h-52',
	56: 'w-56 h-56',
	60: 'w-60 h-60',
	64: 'w-64 h-64',
	72: 'w-72 h-72',
	80: 'w-80 h-80',
	96: 'w-96 h-96',
	0.5: 'w-0.5 h-0.5',
	1.5: 'w-1.5 h-1.5',
	2.5: 'w-2.5 h-2.5',
	3.5: 'w-3.5 h-3.5',
} 

type TailwindSpacingLookup = keyof typeof TailwindSpacingLookup

export type TailwindSpacing = TailwindSpacingLookup | string;

type TailwindSpacingPx = {
    [K in TailwindSpacingLookup]: `${K}px`;
};

export type TailwindPixelSize = TailwindSpacingPx[keyof TailwindSpacingPx];



