/// <reference types="svelte" />
declare module '*.sty' {
  const content: any;
  export default content;
}

declare module '*.txt' {
    export const code;
}
declare module '*.json' {
    export const code;
}

declare module '*.wasm' {
    export const code;
}
