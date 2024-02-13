<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
export let samp: string = `
    \\infer{\\land}{E}{
            A
            &
            \\infer{\\lor}{D}{B & C}
        }
    `;
`\\newcommand{\\infer}[3]{\\cfrac{#2\\qquad #3}{#2 \\wedge #3}\\small{#1}}`


const map = { //here is where we're going to store constants, I just think it looks better this way, this is the same as just declaring them as constants except now you need to preface their names with 'map.'(I am writing this as example easy code by the way if any programmers are wondering why it looks like this)
    splitr: "&",
    splitrRep: "\\qquad ",
    labelMark: "=",
    escapeChar: "+",
    singleVarRep: "\\lower5pt", //TODO: remove awkward height of single variables when next to large formulas
    entail: "*",
    entailRep: "\\vdots"

};
    let output: string = 'CONTENTS NOT LOADED'
onMount(() => {
    let ns:string[] = []; //We make an array and then push each individual character present in the string into the array, in typescript, you declare the type of a variable with :type after the name of the variable in its declaration
    function addAll (arr: string[], str: string){
            for(let ii = 0; ii < str.length; ii++){
                arr.push(str.charAt(ii));
            }
        return arr;
    }
    for(let i = 0; i < samp.length; i++){
        let char = samp.charAt(i)

        if(char == map.splitr){
            ns = addAll(ns, map.splitrRep);
        }
            else if(char == map.escapeChar){

            }

        else if(char == map.entail){
            let labelIndices: number[] = [];
            for(let ii=i; ii < samp.length; ii++){
                    if(samp.charAt(ii) == "{"){labelIndices[0] = ii}
                    if(samp.charAt(ii) == "}"){labelIndices[1] = ii; break;}
            } 
            ns = addAll(ns, samp.substring(labelIndices[0], labelIndices[1]-1));
            ns = addAll(ns, map.entailRep + "}");
            i = i+map.entailRep.length + labelIndices[1]-labelIndices[0];
        }
        else if(char == map.labelMark && samp.charAt(i-1) != map.escapeChar){
            let labelIndices: number[] = [];
            for(let ii=i; ii < samp.length; ii++){
                if(samp.charAt(ii) == "[" || samp.charAt(ii) == "]"){
                    labelIndices.push(ii);
                }
            } 
            const str = "{" + samp.substring(labelIndices[0]+1, labelIndices[1]-2) + "}"; 
            ns = addAll(ns, str);
            i = i+str.length+2;
        }

        else{
            ns.push(samp.charAt(i));
        }
    }
    output = ns.join(""); 
})
</script>

<main>
    <div>
        {@html output}
    <div>
</main>
