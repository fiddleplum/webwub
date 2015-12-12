# webwub
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
