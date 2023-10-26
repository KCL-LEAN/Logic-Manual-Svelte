import preprocess from "svelte-preprocess";
import preprocessReact from "svelte-preprocess-react/preprocessReact";

export default {
  preprocess: preprocessReact({
    preprocess: preprocess({ sourceMap: true }),
  }),
};
