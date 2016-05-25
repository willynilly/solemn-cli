# solemn-cli
A command line tool to detect inappropriate language in your code.

## Overview
The command line tool scans a set of files for inappropriate language and prints violation messages to the console.  Each inappropriate word is associated to one or more violation categories.  For example, you might associate the word "beefcake" with the violation category "sexist".  You can use your own custom dictionary to specify words that cause violations.

## Usage
```js

> solemn -f ./app/**/*.*

> solemn -f ./app/**/*.css -json

```

## Options
```js

-f, --files <pattern> [<pattern>]*   A list of glob patterns for the files
                                     you want searched. Example:
                                     ./app/**/*.js ./app/**/*.css
-d, --dictionary <path>              A file path to a dictionary. If this
                                     option is not used, it will use a
                                     default dictionary. The custom
                                     dictionary file is a JSON file
                                     containing a single JSON object. The
                                     keys of the object are words in the
                                     dictionary and the values for each key
                                     is an array of category tags. Example:
                                     {"hell": ["religious", "rude"], "babe":
                                     ["sexist"]}
-j, --json                           Output violations to the console as
                                     JSON.

```

## Dictionary Format
Each custom dictionary is a JSON file with the following format:

```js
{
  "word1": ["category1", "category3"],
  "word2": ["category2"],
  "word3": ["category1"]
  "word4": ["category2", "category3", "category4"]
}
```

Every word must have at least one violation category.  If multiple dictionaries are specified, words and their categories are merged.

## Test
To test the module, run the follow from the command line:
```js

npm test
