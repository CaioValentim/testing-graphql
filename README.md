## Title

Data flow control issue with graphql.

## Description

That repository contains a user Resolver File, and this file is a Class with three methods.

This example repository tries to build a user in a different way using Query and ResolveField.

1 - Query userWithStaticAddress (that should just create a static user with a static address)

2 - Query userWithDynamicAddress (that should create but not create address object)

3 - ResolveField getDynamicAddress (that should be used to build dynamic address), and I would like to trigger this
method just when the data flow comes from Query userWithDynamicAddress.

Besides that, it looks like I cannot use parent args inside a resolveField.

# Query examples

You can use playground on this project, and that is already set.

-------------------------------------------------------

<b>Query</b> :

query{ userWithStaticAddress{ name address{ street } } }

<b>Desired return </b> :

{
"data": {
"userWithStaticAddress": {
"name": "John Doe",
"address": {
"street": "static street"
} } } }

<b>Real return </b> :

{
"data": {
"userWithStaticAddress": {
"name": "John Doe",
"address": {
"street": "John Doe custom"
} } } }

-------------------------------------------------------


<b>Query</b> :

query{ userWithDynamicAddress(street:"new Street"){ name address{ street } } }

<b>Desired return </b> :

{ {
"data": {
"userWithDynamicAddress": {
"name": "John Doe",
"address": {
"street": "John Doe custom new Street"
} } } }

<b>Real return </b> :

{
"data": {
"userWithDynamicAddress": {
"name": "My name",
"address": {
"street": "John Doe custom"
} } } }

-------------------------------------------------------

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

The app is configured to run on port 3000
```

