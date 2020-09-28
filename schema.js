const { GraphQLInt, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const fetch = require('node-fetch');


const FilmsType = new GraphQLObjectType({
    name: 'Films',
    description: 'The films were the actor was filmed',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: resp => fetch(resp).then(response => response.json()).then(r => r.title)
        }
    })
})

const PeopleType = new GraphQLObjectType({
    name: 'People',
    description: 'Different characters from swapiApi',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: resp => resp.name
        },
        films: {
            type: GraphQLList(FilmsType),
            resolve: resp => resp.films
         }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields:() => ({
            people: {
                type: PeopleType,
                args:{
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://swapi.dev/api/people/${args.id}/`
                ).then(response => response.json())
            }
        })
    })
})