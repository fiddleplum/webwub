# WebWub

A toolkit for web applications

# Coding Rules

## Braces

In Javascript, the brace should always be on the same line as the class/body declaration. See [here](http://stackoverflow.com/questions/3641519/why-does-a-results-vary-based-on-curly-brace-placement) for why.

## Namespaces

They should begin with an uppercase letter to match built-in namespaces.

```
var NamespaceName = NamespaceName || {};
NamespaceName.variable = 4;
NamespaceName.functionName = function() {
}

```

## Classes

Many Javascript object design patterns advocate member privacy using local variables within function objects. I disagree, however, as making members private makes debugging on browsers very difficult. To make a member internal, just prefix it with a `_`. This way, it will be obvious that the user shouldn't use the member externally, but the user can still probe into the object to see its internal state for debugging.

A class constructor should be declared and used like this:

```
var ClassName = function(argument0, ...) {
  this.argument0 = argument0;
  ...
}

ClassName.prototype.staticVariable = 'foo';
ClassName.prototype.functionName = function() {}
```

Note that the prototype functions and static data are each separate, as opposed to them being all within a single prototype declaration, because then you can then have inner classes with their own functions inside:

```
ClassName.prototype.InnerClassName = function(argument0, ...) {
  ...
}

ClassName.prototype.InnerClassName.prototype.functionName = function() {}
```

## Function Variables

Always declare `var` before local function variable names.
