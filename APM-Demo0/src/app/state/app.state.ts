
// we should not create interfaces for the modules which are lazily loaded module like Products, instead we need to extend this global state in indidual module
// global state interface
export interface State{

    user:any;
}