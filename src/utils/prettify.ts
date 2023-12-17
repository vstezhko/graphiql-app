export function formatGraphQL(queryBody: string) {
  const openBraces = (queryBody.match(/{/g) || []).length;
  const closeBraces = (queryBody.match(/}/g) || []).length;

  if (openBraces !== closeBraces) {
    throw new Error('syntax');
  }

  if (openBraces === 0) {
    throw new Error('noQuery');
  }

  const blocks = [];
  let currentBlock = '';
  let indentationLevel = 0;
  let inComment = false;

  for (let i = 0; i < queryBody.length; i++) {
    const char = queryBody[i];

    if (char === '#') {
      inComment = true;
    }

    if (inComment) {
      currentBlock += char;
      if (char === '\n') {
        blocks.push(currentBlock);
        currentBlock = '';
        inComment = false;
      }
    } else {
      currentBlock += char;
      if (char === '{') {
        indentationLevel++;
      } else if (char === '}') {
        indentationLevel--;
        if (indentationLevel === 0) {
          blocks.push(currentBlock);
          currentBlock = '';
        }
      }
    }
  }

  let formattedQuery = '';
  console.log(blocks);
  for (const block of blocks) {
    debugger;
    formattedQuery += parseBlock(block) + '\n';
  }

  if (formattedQuery.endsWith('\n')) {
    formattedQuery = formattedQuery.slice(0, -1);
  }

  return formattedQuery;
}

export function parseBlock(block: string) {
  const trimmedBlock = block
    .replace(/\s+/g, ' ')
    .replace(/^\s*$[\n\r]{1,}/gm, '')
    .replace(/{\s+/g, '{')
    .replace(/\s+}/g, '}')
    .replace(/\s+\(/g, '(')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s+:/g, ':')
    .replace(/\s+,/g, ',')
    .replace(/,\s+/g, ',')
    .trim();
  let formattedQuery = '';
  let indentationLevel = 0;
  let isParam = false;
  console.log(trimmedBlock);

  for (let i = 0; i < trimmedBlock.length; i++) {
    const char = trimmedBlock[i];

    if (char === '{') {
      if (trimmedBlock[i + 1] === '}') {
        formattedQuery += char + trimmedBlock[i + 1];
        i++;
      } else {
        formattedQuery += char + '\n' + '  '.repeat(++indentationLevel);
      }
    } else if (char === '}') {
      formattedQuery += '\n' + '  '.repeat(--indentationLevel) + char;
    } else if (char === ',') {
      isParam
        ? (formattedQuery += char + ' ')
        : (formattedQuery += '\n' + '  '.repeat(indentationLevel));
    } else if (char === '=') {
      if (!formattedQuery.endsWith(' ')) {
        formattedQuery += ' ';
      }
      formattedQuery += char;
      if (i + 1 < trimmedBlock.length && trimmedBlock[i + 1] !== ' ') {
        formattedQuery += ' ';
      }
    } else if (char === ':') {
      formattedQuery += char;
      if (i + 1 < trimmedBlock.length && trimmedBlock[i + 1] !== ' ') {
        formattedQuery += ' ';
      }
    } else if (
      char === ' ' &&
      indentationLevel !== 0 &&
      trimmedBlock[i + 1] !== '{' &&
      trimmedBlock[i - 1] !== ':' &&
      trimmedBlock[i + 1] !== '@'
    ) {
      formattedQuery += '\n' + '  '.repeat(indentationLevel);
    } else if (char === ')') {
      isParam = false;
      formattedQuery += char;
      if (trimmedBlock[i + 1] !== ' ') formattedQuery += ' ';
    } else {
      if (char === '(') {
        isParam = true;
      }
      formattedQuery += char;
    }
  }

  return formattedQuery;
}

export function formatJSON(json: string) {
  console.log(JSON.stringify(JSON.parse(json), null, 2));
  return JSON.stringify(JSON.parse(json), null, 2);
}
