import { ethers } from 'ethers/dist/ethers.esm.min.js';


// @ts-ignore
function isFunc(f) {
  return f.split(' ')[0] === 'function';
}

// @ts-ignore
function interfaceFunc(f) {
  let ret = f;
  if (ret.indexOf(' view ') > -1) {
    return ret;
  }
  if (ret.indexOf(' returns ') == -1) {
    if (ret.indexOf(' payable ') == -1) {
      return ret + ' returns ()';
    }
    return ret + ' nonpayable returns ()';
  }

  if (ret.indexOf(' payable ') == -1) {
    return ret.replace(' returns ', ' nonpayable returns ');
  }

  return ret;
}


// @ts-ignore
export default function createHuffTemplate(ifaceText) {
  /*
  [
  // Constructor
  "constructor(string symbol, string name)",
  "function allowance(address,address) view returns (uint256)",

  "function approve(address,uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function DOMAIN_SEPARATOR() view returns (bytes32)",
  "function nonces(address) view returns (uint256)",
  "function permit(address,address,uint256,uint256,uint8,bytes32,bytes32)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address,uint256)",
  "function transferFrom(address,address,uint256)",
  "function decimals()  returns (uint256)",
  "function name()  returns (string)",
  "function symbol()  returns (string)",

]
*/

  const iface = new ethers.utils.Interface(ifaceText);


  let funcs = iface.format(ethers.utils.FormatTypes.minimal);
  let sigHash = Object.keys(iface.functions).map(f => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(f)).slice(0, 10));

  /**
   * @type {any[]}
   */
  let defaultOrder = []

  const exist = {}
  // @ts-ignore
  funcs = funcs.filter(isFunc).map((f, i) => {
    let name = f.split('(')[0].split(' ')[1];
    // @ts-ignore
    if (exist[name]) {
      // @ts-ignore
      exist[name] += 1;
      // @ts-ignore
      name = name + exist[name];
    } else {
      // @ts-ignore
      exist[name] = 1;
    }

    defaultOrder.push(interfaceFunc(f))

    return {
      fullname: f,
      interfacefunc: interfaceFunc(f),
      name,
      uppercase: name == name.toUpperCase() ? name : name.split(/(?=[A-Z])/).join('_').toUpperCase(),
      '4bytes': sigHash[i],
      number: parseInt(sigHash[i], 16)
    }
  // @ts-ignore
  }).sort((a, b) => a.number - b.number);




  // @ts-ignore
  function splitInTwo(arr) {
    const half = Math.floor(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)];
  }

  // @ts-ignore
  function formatPivots(arr, pivot = '0') {
    if (arr.length > 4) {
      const orig = arr;
      arr = splitInTwo(arr);
      return {
        pivot,
        pivots: [formatPivots(arr[0], pivot + '0'), formatPivots(arr[1], pivot + '1')],
        half: orig[Math.floor(orig.length / 2)]
      };
    }
    return arr;
  }

  const tree = formatPivots(funcs);

  // @ts-ignore
  function renderPivot(input, deep = 0) {
    let ident = '    ';
    if(deep > 1) {
      ident += new Array(deep - 1).fill('  ').join('')
    }

    if (!input.half) {
      // @ts-ignore
      return input.map(e => {
        let ret = ident +`// ${e.fullname}\n`;
        //const spaces = new Array(25 - e.name.length).fill(' ').join('')
        let spaces = '  ';

        ret += ident + `dup1 ${exist[e.name] > 1 ? e['4bytes'] : '__FUNC_SIG('+e.name+')'}  eq ${e.name}Jump ${spaces}jumpi\n`;
        return ret;
      }).join('\n') + `\n\n` + ident + `not_found jump\n`;
    }
    return `
// pivot${input.pivot} cut on ${input.half.fullname}
dup1 ${exist[input.half.name] > 1 ? input.half['4bytes'] : '__FUNC_SIG('+input.half.name+')'} lt pivot${input.pivot} jumpi
    ${renderPivot(input.pivots[0], deep +1)}
pivot${input.pivot}:
    ${renderPivot(input.pivots[1], deep +1)}
`.split('\n').map(e => ident+e).join('\n')+'\n';

  }

  // @ts-ignore
  const jumps = funcs.map(f =>`
    // ${f.fullname} 
    ${f.name}Jump:
      ${f.uppercase}()`).join('\n');



  return `
// Define Interface
${defaultOrder.map(f => '#define ' + f).join('\n')}

// Function Dispatching
#define macro MAIN() = takes (1) returns (1) {
    // Identify which function is being called.
    // [func sig]
    0x00 calldataload 0xE0 shr
    
${renderPivot(tree)}
    not_found:
      // Revert if no match is found.
      0x00 dup1 revert
    
${jumps}`;
}