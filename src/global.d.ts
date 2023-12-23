/// <reference types="svelte" />
declare module '*.sty' {
  const content: any;
  export default content;
}

declare module '*.html' {
  const content: any;
  export default content;
}
declare module '*.txt' {
    const content: any;
    export default content;
}
declare module '*.json' {
    export const code;
}

declare module '*.wasm' {
    export const code;
}
