import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { gql } from "apollo-boost";
import { GET_QUEUED_SONGS } from "./queries";
// import { isObjectType } from 'graphql';
//This code is necessary in order to create a subscriptions mutation
const client = new ApolloClient({
    link: new WebSocketLink ({
        //this connects to web sockets (wss)
        uri: 'wss://apollo-music-share-bdk.herokuapp.com/v1/graphql',
        options: {
            reconnect: true
        }
    }),
    cache: new InMemoryCache(),
    //queue code
    typeDefs: gql`
        type Song {
            id: uuid!
            title: String!
            artist: String!
            thumbnail: String!
            duration: Float!
            url: String!
        }

        input SongInput {
            id: uuid!
            title: String!
            artist: String!
            thumbnail: String!
            duration: Float!
            url: String!
        }

        type Query {
            queue: [Song]!
        }

        type Mutation {
            addOrRemoveFromQueue(input: SongInput!): [Song]!
        }
  `,
  //how the data we receive on input is going to resolve into an array of songs
  resolvers: {
      Mutation: {
          addOrRemoveFromQueue: (_, { input }, { cache }) => {
               const queryResult =  cache.readQuery({ 
                    query:  GET_QUEUED_SONGS
                }) 
               if (queryResult) {
                   const { queue } = queryResult;
                   const isInQueue = queue.some(song => song.id === input.id)
                    const newQueue = isInQueue ? 
                        queue.filter(song => song.id !== input.id )
                        : [...queue, input];
                    cache.writeQuery({
                        query: GET_QUEUED_SONGS,
                        data: { queue: newQueue }
                    });
                   return newQueue;
               }
               return [];
          }
      }
  }
});

const hasQueue = Boolean(localStorage.getItem('queue'));
//**VERY IMPORTANT: When we save the files and the app reloads, the queue items are taken from local storage put in the cache and queried using a local query and put in the queue song list component and will continue to persist the data changes whenever we add new items or remove old ones */
// Apollo can help us store data locally in the browser
const data = {
    //parse takes the strinified data and puts it back into an array
    queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
}

client.writeData({ data });

// import ApolloClient from 'apollo-boost';

// const client = new ApolloClient({
//     uri: "https://apollo-music-share-bdk.herokuapp.com/v1/graphql"
// })

export default client;