<div>
    <pre style="margin: 0; line-height: 125%">
            <slot></slot>
    </pre>
</div>

<style>
div :global(> :first-child) {
    color: #fabd2e;
    font-weight: bold;
}
div {
    background: #000000;
    overflow:auto;
    width:auto;
    border:solid gray;
    border-width:.1em .1em .1em .8em;
    padding:.2em .6em;
}
</style>
