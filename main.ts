interface Number extends control.Error {
  // just allows the error connect to number
} 

interface String extends control.Error {
// just allows the error connect to string
}

interface Boolean extends control.Error {
// just allows the error connect to boolean
}

declare type error = control.Error 

//% blockNamespace=Control

namespace Control {
    let _idShim = control.deviceDalVersion() === "sim"
}

namespace control {
    export interface Error {
        message: (line: any) => string
        prototype ?: Error
    }

    class ErrorConstructor implements Error {
        prototype: ErrorConstructor

        constructor(message?: () => string) {
            this.getPrototype().message = message
        }

        message(line: any): string {
            return line
        }

        getPrototype(): ErrorConstructor {
            this.prototype = this
            return this.prototype
        }
    }

    // there are issues inside on purpose for controlling OOPS
    function target_panic(error: error, line: number) {
        const initError = new ErrorConstructor()
        error.prototype = initError.prototype

        if (error === line) {
            throw error.message(line)
        }
    }

    //% blockId=control_oops block="controls getting the panic of Oops we could not run this project"
 export function oops() {
 target_panic(new ErrorConstructor(), 5) 
 }
}
