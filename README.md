# apigee-utils

A set of utility functions to ease javascript development on the Apigee Edge api platform

## Installation

```bash
npm i -S apigee-utils
```

## How to use?

## Reference

### getQueryParam

This will get a queryParam from the passed url string

**Parameters**

-   `queryParamKey` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The key for the queryParam
-   `defaultValue` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** The default value to return when nothing is available

Returns **** The value of the queryParam

### getQueryParams

This will get a set of queryParams from the passed url string

**Parameters**

-   `possibleQueryParams` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** An array containing possible queryparams
-   `settings`  Object containing the settings for getting the queryparams
    -   `settings.defaultValues`  The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.defaultValues`   (optional, default `{}`)

Returns **** An object containing values for the passed in queryparams

### createQueryParams

This will convert an object with key value pairs to a new object with key value pairs

**Parameters**

-   `queryParams` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object containing key value pairs to be used as query parameters
-   `settings`  Object containing the settings for creating the queryparams
    -   `settings.renamer`  The name of the keys to rename. In a format of oldname: newname
    -   `settings.defaultValues`  The value to return when no value is found. The keys of the default values should be identical to the queryparam keys.
    -   `settings.transformer`  A transformer object contains functions which take a value and return a new value. The keys of the transformer should be identical to the queryparam keys.
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.renamer`   (optional, default `{}`)
    -   `$1.defaultValues`   (optional, default `{}`)
    -   `$1.transformer`   (optional, default `{}`)

### setQueryParam

This will set a query parameter to the provided value

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The key of the queryparam to set
-   `value` **Any** The value to set the queryparam to

Returns **** 

### setQueryParams

This will convert an object with key value pairs to query parameters

**Parameters**

-   `queryParams` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object containing key value pairs to be used as query parameters

Returns **** 

### validateQueryParams

This will validate a set of query parameters and will set a error variable in the apigee with an errorpayload variable which can be send down to the client
It is advised to set up a raise on error policy which will return the payload when the error variable == true

**Parameters**

-   `queryParams` **QueryParams** The keys the values to get are stored with
-   `settings`  Object containing the settings for getting the variables
    -   `settings.validator`  The validator is an object containing functions which take a value and tests whether the value matches to required format returning true for a valid parameter and false for invalid. Or it can return a custom error message as a string. It is also possible to return mutliple error messages as an array of strings. The keys of the validator should be identical to the queryparam keys.
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.validator`   (optional, default `{}`)

Returns **** A boolean indicating whether an invalid query param was detected or not

### createErrorObject

This will create the default error message

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The key of the query parameter
-   `value` **Any** The value of the query parameter
-   `message` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The custom message to use

Returns **** A default error object

### validateBoolean

This will do a simple check if the passed string is a stringified boolean or not

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the variable to check
-   `value` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The value of the variable to check

Returns **** A default error message or an empty string

### validateEnum

This will do a simple check if the passed value is one of the valid values

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the variable to check
-   `value` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The value of the variable to check
-   `validValues` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** The options for value

Returns **** A default error message or an empty string

### validateMultipleEnum

This will do a simple check if the passed string of values contains one or more valid values

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the variable to check
-   `values` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The values of the variable to check (must be a string seperated by commas)
-   `validValues` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** The options for value

Returns **** A default error message or an empty string

### setVariable

This will store a value in the Apigee flow

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The key the value should be stored in
-   `value` **Any** The value to store
-   `settings`  Object containing the settings for setting the variable
    -   `settings.prefix`  A prefix which is used to store the value with
-   `$2` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$2.prefix`   (optional, default `''`)

### setVariables

This will store a set of values in the Apigee flow

**Parameters**

-   `variables` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object containing key value pairs to store
-   `settings`  Object containing the settings for setting the variables
    -   `settings.prefix`  A prefix which is used to store the value with
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.prefix`   (optional, default `''`)

### getProxyResponse

This will get the response from the proxy

**Parameters**

-   `settings`  Object containing the settings for getting the response from the proxy
    -   `settings.characterEncoding`  Optionally convert the response to UTF-8
-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$0.characterEncoding`  

Returns **** The response from the targetted API

### setResponse

This will set the response to the provided content

**Parameters**

-   `content` **Any** The response to set for the proxy
-   `settings`  Object containing the settings for setting the response
    -   `settings.contentType`  An optional contenttype header to set for the response
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.contentType`  

Returns **** 

### getVariable

This will get a value from the Apigee flow

**Parameters**

-   `key` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The key the value to get is stored with
-   `settings`  Object containing the settings for getting the variable
    -   `settings.prefix`  A prefix which is used to store the value with
    -   `settings.defaultValue`  The value to return when no value is found
    -   `settings.parser`  The parser is a function which takes a value and transforms it to return something else
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.prefix`   (optional, default `''`)
    -   `$1.defaultValue`  
    -   `$1.parser`  

Returns **** The value parsed from the apigee flow

### getVariables

This will get a set of values from the Apigee flow

**Parameters**

-   `keys` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** The keys the values to get are stored with
-   `settings`  Object containing the settings for getting the variables
    -   `settings.prefix`  A prefix which is used to store the value with
    -   `settings.defaultValues`  The value to return when no value is found. The keys of the default values should be identical to the variable keys.
    -   `settings.parser`  The parser is an object containing functions which take a value and transforms it to return something else. The keys of the parser should be identical to the variable keys.
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.prefix`   (optional, default `''`)
    -   `$1.defaultValues`   (optional, default `{}`)
    -   `$1.parser`   (optional, default `{}`)

Returns **** The values parsed from the apigee flow
