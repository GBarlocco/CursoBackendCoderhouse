import { red, green, bgYellow, bgWhite, bold } from './deps.ts';

import { parse } from './deps.ts';

const myDate = parse('15-10-2022', 'dd-mm-yyyy');

console.log(myDate);

console.log(bgYellow(bold(red('Hello Deno!'))))
console.log(bgWhite(bold(green('Hello Deno!'))))



//cmd --> deno run index.ts