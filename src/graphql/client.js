import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
//This code is necessary in order to create a subscriptions mutation
const client = new ApolloClient({
    link: new WebSocketLink ({
        //this connects to web sockets (wss)
        uri: 'wss://apollo-music-share-bdk.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache()
})


// import ApolloClient from 'apollo-boost';

// const client = new ApolloClient({
//     uri: "https://apollo-music-share-bdk.herokuapp.com/v1/graphql"
// })

export default client;