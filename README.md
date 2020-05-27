## The System
A GraphQL API Client for Pokémon Data.
Based in the Pokémon GraphQL Server: https://graphql-pokemon.now.sh

## Features
- GraphQL  API
- React Apollo Client
- RealTime GraphQL Query View (Top-Right)
- Query Results in JSON Panel (Bottom)

## Online Acess

You Can acess the system in this link: https://lrmendes.github.io/React-GraphQL-PokemonAPI

## How it works?

The System allow user to build your own pokemon graphql query, choosing custom attributes for the query return.

The system contains many attributes of a pokemon and a subquery for pokemon evolutions, which returned a list of pokemon within the same object. You can still choose the attributes you need from the evolution subquery.

## Learn GraphQL

The Two big Textarea in the page are showing:
- (Top-Right) The query structure to do a graphql call.
- (Bottom) The result data from the current query.

The main reason for this is to understand how queries work by viewing an input query and the output data. Aiming to learn how to build your own communication between a graphql client and server.