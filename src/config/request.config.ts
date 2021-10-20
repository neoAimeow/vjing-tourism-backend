import { NEED_LOGIN_EVENT_KEY } from "./../models/constant";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import EventEmitter from "eventemitter3";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        let isUnauthorized = false;
        graphQLErrors.map(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`);
            if (message === "Unauthorized") {
                isUnauthorized = true;
            }
        });
        if (isUnauthorized) {
            const eventEmitter = new EventEmitter();
            eventEmitter.emit(NEED_LOGIN_EVENT_KEY);
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
});

export const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
});
