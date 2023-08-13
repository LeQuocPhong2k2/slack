import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IChannel } from "../slice/types";

export const channelApi = createApi({
    reducerPath: 'channelApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/channels' }),
    endpoints: (builder) => ({
        getAllChannels: builder.query({
            query: () => '/',
        }),
        getChannelById: builder.query<IChannel,string>({
            query: (id) => `/${id}`,
        }),
    }),
})

export const { useGetAllChannelsQuery,useGetChannelByIdQuery } = channelApi