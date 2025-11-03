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

//% advanced=true icon="\uf110"
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
            this.getPrototype().message = message // this is a hack
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

    //% blockId=control_oops block="panic Oops, we could not run this project. Please check your code for errors."
  //% blockNamespace=Control
  //% shim=TD_NOOP
  //% color="0xFF6600"
  /**
   * Warning do not use this only if you want to crash the engine immeditely
   * it triggers a real runtime panic and I recommend not use it only if you are sure you rather to use it
   * You do not need to exactly do control.oops()
   * you can just do control.oops because the runtime 
   * already scans the function because of the name of it 
   * for TS only 
   * Also using pause or anything to wait until will 
   * not work because those are for the simulator not for the web.
   */
 export function oops(line = 0) {
 target_panic(new ErrorConstructor(), line)  // the line is not neccessary just for extra
 }
}