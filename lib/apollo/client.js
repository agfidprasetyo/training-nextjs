import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const cache = new InMemoryCache();

export default function createApolloClient(initialState, ctx) {
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: "https://b2cdemo.getswift.asia/graphql",
            credentials: "same-origin"
        }),
        cache: cache.restore(initialState),
    });
}

