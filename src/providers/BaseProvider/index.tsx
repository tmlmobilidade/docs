'use client';

import { VehiclePositionContextProvider } from '#/src/app/contexts/VehiclePosition.context';
import { HttpException } from '@tmlmobilidade/consts';
import { HttpResponse } from '@tmlmobilidade/utils';
/* * */

import { PropsWithChildren } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';

/* * */

export function BaseProvider({ children }: PropsWithChildren) {
	//

	const swrSettings: SWRConfiguration = {
		fetcher: async (url: string) => {
			const res = await fetch(url);
			const data = await res.json() as HttpResponse<unknown>;

			if (!res.ok) {
				throw new HttpException(res.status, data.error ?? 'An error occurred');
			}

			return data.data as unknown;
		},
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
