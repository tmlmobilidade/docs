'use client';

import { VehiclePositionContextProvider } from '#/src/app/contexts/VehiclePosition.context';
import { swrFetcher } from '@tmlmobilidade/utils';
/* * */

import { PropsWithChildren } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

/* * */

export function BaseProvider({ children }: PropsWithChildren) {
	//

	const swrSettings: SWRConfiguration = {
		fetcher: swrFetcher,
		refreshInterval: 60_000, // 1 minute
		refreshWhenHidden: true,
		revalidateIfStale: true,
		revalidateOnFocus: true,
		revalidateOnMount: true,
	};

	return (
		<SWRConfig value={swrSettings}>
			<VehiclePositionContextProvider>
				{children}
			</VehiclePositionContextProvider>
		</SWRConfig>
	);
}
