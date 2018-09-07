import "reflect-metadata"

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter4 {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        const formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}

const person3 = new Greeter4('test');

console.log(person3.greet());
