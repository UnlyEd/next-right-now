# Proptypes (AKA "types of properties")

> TLDR; Our decision is to prefer **TypeScript** over _PropTypes_.

Prop types "_conflicts_" with TypeScript types because:
- They **duplicate** information in a non-trivial way, you can't just copy/paste propTypes into TS types and converting them manually requires time
- PropTypes run at **runtime**, unlike TS types which run at **compile time**
    - Typescript is useful when you are writing code: it will warn you if you pass an argument of the wrong type to your React components, give you autocomplete for function calls, etc.
    - PropTypes are useful when you test how the components interact with external data, for example when you load JSON from an API.
        PropTypes will help you debug (when in React's Development mode) why your component is failing by printing helpful messages like:
        > Warning: Failed prop type: Invalid prop `id` of type `number` supplied to `Table`, expected `string`

We decided not to use PropTypes mostly because of the additional work which doesn't seem worth it.
There are a few PropTypes being used, but they come from a time when we weren't using TS.

Feel free to use both if you'd like to.
