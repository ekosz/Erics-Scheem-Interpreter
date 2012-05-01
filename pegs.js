start =
  expression

expression =
  whiteSpace* atom:atom {return atom;}
/ whiteSpace* "'" "(" exps:expression+ ")" {return ['quote', exps];}
/ whiteSpace* "(" exps:expression+ ")" {return exps;}

atom =
  chars:validChars+ {return chars.join("");}
/ number

validChars =
  [a-zA-Z_?!+\<\>\-=@#$%^&*/.]

number =
  nums:[0-9]+ {return parseInt(nums.join(""), 10);}

whiteSpace =
  [ \n]
