<script lang="ts">
export let samp: string = `
    \\infer{\\land}{E}{
            A
            &
            \\infer{\\lor}{D}{B & C}
        }
    `;
`\\newcommand{\\infer}[3]{\\cfrac{#2\\qquad #3}{#2 \\wedge #3}\\small{#1}}`


const map = { //here is where we're going to store constants, I just think it looks better this way, this is the same as just declaring them as constants except now you need to preface their names with 'map.'
    splitr: "&",
    splitrRep: "\\qquad",
    labelMark: "=",
    singleVarRep: "\\lower5pt" //TODO: remove awkward height of single variables when next to large formulas

};

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
    else if(char == map.labelMark){
        let labelIndices: number[] = [];
        for(let ii=i; ii < samp.length; ii++){
            if(samp.charAt(ii) == "[" || samp.charAt(ii) == "]"){
                labelIndices.push(ii);
            }
        } 
        const str = "{" + samp.substring(labelIndices[0]+1, labelIndices[1]-2) + "}"; //might be wrong
        ns = addAll(ns, str);
    }
    else{
        ns.push(samp.charAt(i));
    }
}
let output = ns.join(""); 
</script>

<main>
    <div>
        $${@html output}$$
    <div>
</main>
