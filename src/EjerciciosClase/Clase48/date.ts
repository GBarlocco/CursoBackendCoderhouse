import { parse } from "https://deno.land/std@0.159.0/datetime/mod.ts";

const myDate = parse(`15-10-2022`, `dd-mm-yyyy`);

console.log(myDate);