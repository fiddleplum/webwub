# WebWub

A toolkit for web applications

# Coding Rules

## Braces

In Javascript, the brace should always be on the same line as the class/body declaration. See [here](http://stackoverflow.com/questions/3641519/why-does-a-results-vary-based-on-curly-brace-placement) for why.

## Namespaces

They should begin with an uppercase letter to match built-in namespaces.

```
var Namespace = Namespace || {};
Namespace.variable = 4;
Namespace.functionName = function() {
}

```

## Classes

Many Javascript object design patterns advocate member privacy using local variables within function objects. I disagree, however, as making members private makes debugging on browsers very difficult. To make a member internal, just prefix it with a `_`. This way, it will be obvious that the user shouldn't use the member externally, but the user can still probe into the object to see its internal state for debugging.

